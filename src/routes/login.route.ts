import { Router } from 'express';
import * as UserController from '../controllers/User.controller';
import loginValidator from '../middlewares/Auth';

const router = Router();

router
  .post('/login', loginValidator, UserController.login);

export default router;
