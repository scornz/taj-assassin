import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'user/user.schema';
import { MongoId } from 'utils/mongo';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  generateJwt(payload: { sub: string; email: string }) {
    return this.jwtService.sign(payload);
  }

  getAuthForUser(user: UserDocument) {
    return this.generateJwt({ sub: user.id, email: user.email });
  }

  getAccessToken(userId: MongoId) {
    const minutes = 30;
    const expires = new Date(Date.now() + minutes * 60000);

    const token = this.jwtService.sign(
      { sub: userId.toString() },
      { expiresIn: `${minutes}m` },
    );

    return { token, expires };
  }

  // async signIn(user) {
  //   if (!user) {
  //     throw new BadRequestException('Unauthenticated');
  //   }

  //   const userExists = await this.findUserByEmail(user.email);

  //   if (!userExists) {
  //     return this.registerUser(user);
  //   }

  //   return this.generateJwt({
  //     sub: userExists.id,
  //     email: userExists.email,
  //   });
  // }

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return result;
  // }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }
}
