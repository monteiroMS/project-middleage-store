import { Router } from 'express';
import * as UserController from '../controllers/User.controller';
import createUserValidator from '../middlewares/createUserValidator';

const router = Router();

router
  .post('/users', createUserValidator, UserController.create);

export default router;