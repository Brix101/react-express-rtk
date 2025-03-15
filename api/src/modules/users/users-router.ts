import type { IRouter } from 'express';
import { Router } from 'express';

import validate from '../../utils/validate-resource';
import { createUserHandler } from './users-controller';
import { createUserInput } from './users.schema';

const router: IRouter = Router();

router.post('/', validate(createUserInput), createUserHandler);

export default router;
