import express from 'express';
import ProductRouter from './routes/products.route';
import UserRouter from './routes/users.route';
import OrderRouter from './routes/orders.route';

const app = express();

app
  .use(express.json())
  .use(ProductRouter)
  .use(UserRouter)
  .use(OrderRouter);

export default app;
