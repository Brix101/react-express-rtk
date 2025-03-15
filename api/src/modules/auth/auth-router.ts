import type { IRouter } from 'express';
import { Router } from 'express';

import { requiredUser } from '../../middleware/required-user';
import { validateBody } from '../../utils/validation-util';
import {
  getMeHandler,
  refreshTokenHandler,
  signInUserHandler,
} from './auth-controller';
import { signInUserSchema } from './auth.schema';

const router: IRouter = Router();

router.post('/signin', validateBody(signInUserSchema), signInUserHandler);
router.post('/refresh', refreshTokenHandler);
router.get('/me', requiredUser, getMeHandler);

export default router;
