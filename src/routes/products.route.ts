import { Router } from 'express';
import * as Product from '../controllers/Product.controller';

const router = Router();

router
  .get('/products', Product.getAll)
  .get('/products/:id', Product.getById);

export default router;
