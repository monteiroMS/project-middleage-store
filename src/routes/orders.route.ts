import { Router } from 'express';
import * as UserController from '../controllers/Order.controller';

const router = Router();

router
  .get('/orders', UserController.getAll);

export default router;
