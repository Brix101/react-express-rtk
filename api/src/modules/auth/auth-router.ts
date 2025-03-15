import type { IRouter } from 'express';
import { Router } from 'express';

import { validateBody } from '../../utils/validate-resource';
import { signInUserHandler } from './auth-controller';
import { signInUserSchema } from './auth.schema';

const router: IRouter = Router();

router.post('/signin', validateBody(signInUserSchema), signInUserHandler);

export default router;
