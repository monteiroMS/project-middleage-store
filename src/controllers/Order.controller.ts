import { Request, Response } from 'express';
import { InternalServerError } from '../errors';
import * as OrderService from '../services/Order.service';

export const getAll = async (_req: Request, res: Response) => {
  const orders = await OrderService.getAll();

  if (orders instanceof Error) {
    return res.status(InternalServerError.code).json(InternalServerError.message);
  }

  return res.status(200).json(orders);
};

interface CreateReq extends Request {
  body: { productsIds: number[] },
  userId?: number,
}

export const create = async (req: CreateReq, res: Response) => {
  const { userId, body: { productsIds } } = req;

  if (!userId) {
    return res.status(400).json({ message: 'BAD_REQUEST' });
  }
  
  const result = await OrderService.create({ userId, productsIds });

  return res.status(201).json(result);
};

export default getAll;
