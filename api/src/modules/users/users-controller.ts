import type { Request, Response } from 'express';

import type { CreateUserInput } from './users.schema';
import db from '../../db';
import { createUser } from './users-service';

export async function createUserHandler(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response,
) {
  try {
    const payload = req.body;

    const result = await createUser(db, payload);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: 'Something went wrong' });
  }
}
