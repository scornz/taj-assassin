export type JwtPayload = {
  iss: string;
  sub: string;
  email: string;
  aud: string;
  exp: Date;
  iat: Date;
  jti: string;
};
