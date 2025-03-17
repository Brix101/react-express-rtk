import type { Request, Response } from 'express';

import type { SignInUserInput } from './auth.schema';
import { verifyPassword } from '../../utils/argon-util';
import { signJwt, verifyJwt } from '../../utils/jwt-util';
import { getUserByEmail, getUserById } from '../users/users-service';
import { refreshTokenSchema } from './auth.schema';

export async function signInUserHandler(
  req: Request<unknown, unknown, SignInUserInput>,
  res: Response,
) {
  try {
    const payload = req.body;

    const user = await getUserByEmail(payload.email);

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

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    res.json({
      accessToken,
      user: data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    res.status(500).json({ message });
  }
}

export async function refreshTokenHandler(req: Request, res: Response) {
  try {
    const { success, data: cookies } = refreshTokenSchema.safeParse(
      req.cookies,
    );

    if (!success) {
      res.json({ accessToken: null, user: null });
      return;
      // throw new Error('Invalid refresh token');
    }

    const { decoded } = verifyJwt<{ sub: number }>(
      cookies.refreshToken,
      'REFRESH_TOKEN_PUBLIC_KEY',
    );

    if (!decoded) {
      res.json({ accessToken: null, user: null });
      return;
      // throw new Error('Invalid refresh token');
    }

    const user = await getUserById(decoded.sub);

    if (!user) {
      res.json({ accessToken: null, user: null });
      return;
      // throw new Error('Invalid refresh token');
    }

    const { password: _, ...data } = user;
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

    res.json({
      accessToken,
      user: data,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    res.status(500).json({ message });
  }
}

export async function getMeHandler(_req: Request, res: Response) {
  try {
    if (!res.locals.user) {
      res.json({ user: null });
      return;
    }

    const { sub } = res.locals.user as { sub: number; email: string };

    const user = await getUserById(sub);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...data } = user;

    res.json({ user: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    res.status(500).json({ message });
  }
}

export function logOutHandler(_req: Request, res: Response) {
  res.clearCookie('refreshToken');
  res.json({ accessToken: null, user: null });
}
