import type { NextFunction, Request, Response } from 'express';

export function requiredUser(_req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user as unknown;

  if (!user) {
    res.sendStatus(403);
    return;
  }
  next();
}
