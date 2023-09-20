import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { JwtPayload } from '../types';
import { RefreshTokenInvalidException } from '../../utils/exceptions';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private config: ConfigService,
    private refreshService: RefreshTokenService,
  ) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req !== null && req.cookies !== null) {
        token = req.cookies['refresh_token'];
      }
      return token;
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const valid = await this.refreshService.verifyJti(payload.jti, payload.sub);
    if (!valid) {
      throw new RefreshTokenInvalidException(payload.jti);
    }

    return { userId: payload.sub };
  }
}
