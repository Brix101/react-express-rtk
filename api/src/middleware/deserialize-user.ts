import type { NextFunction, Request, Response } from 'express';

import { verifyJwt } from '../utils/jwt-util';

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const bearerToken = req.headers.authorization ?? '';

  const accessToken = bearerToken.replace('Bearer ', '');

  if (!accessToken) {
    return next();
  }

  const { decoded } = verifyJwt<{ sub: number; email: string }>(
    accessToken,
    'ACCESS_TOKEN_PUBLIC_KEY',
  );

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  next();
}

export default deserializeUser;
