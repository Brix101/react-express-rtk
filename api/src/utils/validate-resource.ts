import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';
import { ZodError } from 'zod';

export function validateBody(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res
          .status(400)
          .json({ message: 'Invalid request body', errors: e.issues });
      } else {
        res.status(500).send('Something went wrong');
      }
    }
  };
}
