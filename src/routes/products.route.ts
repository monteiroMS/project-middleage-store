import { Router } from 'express';
import * as Product from '../controllers/Product.controller';
import productCreateValidator from '../middlewares/productCreateValidator';

const router = Router();

router
  .get('/products', Product.getAll)
  .get('/products/:id', Product.getById)
  .post('/products', productCreateValidator, Product.create);

export default router;
