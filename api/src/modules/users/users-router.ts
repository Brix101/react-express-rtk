import type { IRouter } from 'express';
import { Router } from 'express';

import { createUserHandler } from './users-controller';

const router: IRouter = Router();

router.post('/', createUserHandler);

export default router;
