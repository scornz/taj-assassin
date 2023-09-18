import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types';
import { RefreshToken } from './refresh-token.schema';
import { v4 as uuid } from 'uuid';
import { MongoId } from 'utils/mongo';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectModel(RefreshToken.name) private refreshModel: Model<RefreshToken>,
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
  ) {}

  async create(userId: MongoId) {
    const user = await this.userService.findById(userId);
    const secret = this.config.get<string>('JWT_REFRESH_SECRET');
    const jti = uuid();
    console.log('yay!');

    const jwt = await this.jwtService.signAsync(
      { sub: userId, email: user.email },
      {
        secret: secret,
        expiresIn: '14d',
        jwtid: jti,
      },
    );
    const decoded: JwtPayload = this.jwtService.decode(jwt) as JwtPayload;
    console.log(decoded);

    console.log('here!');
    const token = new this.refreshModel();
    token.userId = user.id;
    token.jti = jti;
    token.expires = decoded.exp;
    await token.save();

    console.log('here?');

    return { token: jwt, jti: decoded.jti };
  }

  async verifyJti(jti: string, userId: string) {
    const token = await this.refreshModel
      .findOne({ jti: jti, userId: userId })
      .exec();

    if (token != null) {
      await token.deleteOne();
      console.log('deleting');
      return true;
    }

    return false;
  }
}
