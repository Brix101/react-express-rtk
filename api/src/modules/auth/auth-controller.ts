import type { Request, Response } from 'express';

import type { SignInUserInput } from './auth.schema';
import db from '../../db';
import { verifyPassword } from '../../utils/argon-util';
import { getUserByEmail } from '../users/users-service';

export async function signInUserHandler(
  req: Request<unknown, unknown, SignInUserInput['body']>,
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

    res.status(200).json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    res.status(500).json({ message });
  }
}
