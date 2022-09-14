import express from 'express';
import ProductRouter from './routes/products.route';
import UserRouter from './routes/users.route';

const app = express();

app
  .use(express.json())
  .use(ProductRouter)
  .use(UserRouter);

export default app;
