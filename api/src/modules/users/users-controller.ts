import type { Request, Response } from 'express';

import db from '../../db';
import { createUser, getUserByEmail, verifyPassword } from './users-service';
import { createUserSchema, signInUserSchema } from './users.schema';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const {
      data: payload,
      error,
      success,
    } = createUserSchema.safeParse(req.body);

    if (!success) {
      res
        .status(400)
        .json({ message: 'Invalid request body', errors: error.issues });
      return;
    }

    const result = await createUser(db, payload);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
}
