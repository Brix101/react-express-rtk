import type { Request, Response } from 'express';

import db from '../../db';
import { verifyPassword } from '../../utils/argon-util';
import { getUserByEmail } from '../users/users-service';
import { signInUserSchema } from './auth.schema';

export async function signInUserHandler(req: Request, res: Response) {
  try {
    const {
      data: payload,
      error,
      success,
    } = signInUserSchema.safeParse(req.body);
    if (!success) {
      res
        .status(400)
        .json({ message: 'Invalid request body', errors: error.issues });
      return;
    }

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
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
}
