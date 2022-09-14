import express from 'express';
import ProductRoute from './routes/products.route';

const app = express();

app.use(express.json());
app.use(ProductRoute);

export default app;
