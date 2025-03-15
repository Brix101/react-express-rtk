import type { IRouter } from 'express';
import { Router } from 'express';

import { signInUserHandler } from './auth-controller';

const router: IRouter = Router();

router.post('/signin', signInUserHandler);

export default router;
