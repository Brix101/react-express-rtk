import type { Request, Response } from 'express';

import type { SignInUserInput } from './auth.schema';
import db from '../../db';
import { verifyPassword } from '../../utils/argon-util';
import { signJwt } from '../../utils/jwt-util';
import { getUserByEmail } from '../users/users-service';

export async function signInUserHandler(
  req: Request<unknown, unknown, SignInUserInput>,
  res: Response,
) {
  try {
    const payload = req.body;

    const user = await getUserByEmail(db, payload.email);

    if (!user) {
      throw new Error('User not found');
    }

    const { password, ...data } = user;

    const validPassword = await verifyPassword(password, payload.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const accessToken = signJwt(
      {
        sub: data.id,
        email: data.email,
      },
      'ACCESS_TOKEN_PRIVATE_KEY',
      {
        expiresIn: '15m',
      },
    );

    const refreshToken = signJwt(
      {
        sub: data.id,
      },
      'REFRESH_TOKEN_PRIVATE_KEY',
      {
        expiresIn: '7d',
      },
    );

    res.json({
      accessToken,
      refreshToken,
      user: data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    res.status(500).json({ message });
  }
}
