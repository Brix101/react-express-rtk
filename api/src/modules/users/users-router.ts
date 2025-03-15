import type { IRouter } from 'express';
import { Router } from 'express';

import { validateBody } from '../../utils/validate-resource';
import { createUserHandler } from './users-controller';
import { createUserSchema } from './users.schema';

const router: IRouter = Router();

router.post('/', validateBody(createUserSchema), createUserHandler);

export default router;
