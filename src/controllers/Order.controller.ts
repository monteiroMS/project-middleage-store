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

export default getAll;
