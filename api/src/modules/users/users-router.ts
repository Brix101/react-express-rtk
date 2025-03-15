import type { IRouter } from 'express';
import { Router } from 'express';

import { validateBody } from '../../utils/validation-util';
import { createUserHandler } from './users-controller';
import { createUserSchema } from './users.schema';

const router: IRouter = Router();

router.post('/', validateBody(createUserSchema), createUserHandler);

export default router;
