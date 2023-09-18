import { Request } from 'express';
import { MongoId } from './mongo';
import { JwtUser } from 'auth/strategies/jwt.strategy';

export const getUserIdFromRequest = (req: Request): MongoId => {
  const jwtUser = req.user as JwtUser;
  return new MongoId(jwtUser.userId);
};
