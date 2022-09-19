import { Router } from 'express';
import * as OrderController from '../controllers/Order.controller';
import authenticator from '../middlewares/Auth';
import createOrderValidator from '../middlewares/createOrderValidator';

const router = Router();

router
  .get('/orders', OrderController.getAll)
  .post(
    '/orders', 
    authenticator,
    createOrderValidator,
    OrderController.create,
  ); 

export default router;
