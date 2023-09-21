import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { UserService } from 'user/user.service';
import { GoogleUser } from './strategies/google.strategy';
import { JwtAuthGuard, JwtRefreshAuthGuard } from './guards';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { MongoId } from 'utils/mongo';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private refreshService: RefreshTokenService,
    private cfg: ConfigService,
  ) {}

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verifyAuth() {
    return { msg: 'success' };
  }

  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshAuth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId: MongoId = new MongoId(req.user['userId']);
    const refreshToken = await this.refreshService.create(userId);
    res.cookie('refresh_token', refreshToken.token, {
      sameSite: 'lax',
      httpOnly: true,
    });

    return { userId, ...this.authService.getAccessToken(userId) };
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax' });
    return { msg: 'success' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.findOrCreateByGoogleUser(
      req.user as GoogleUser,
    );
    const refreshToken = await this.refreshService.create(user.id);
    res.cookie('refresh_token', refreshToken.token, {
      sameSite: 'lax',
      httpOnly: true,
    });

    res.redirect(
      `${this.cfg.getOrThrow<string>('FRONTEND_HOST')}/#/app/register`,
    );
  }
}
