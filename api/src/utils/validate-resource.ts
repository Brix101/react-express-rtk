import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject } from 'zod';
import { ZodError } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  (
    req: Request<unknown, unknown, unknown>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res
          .status(400)
          .json({ message: 'Invalid request body', errors: e.issues });
      }

      res.status(500).send('Something went wrong');
    }
  };

export default validate;
