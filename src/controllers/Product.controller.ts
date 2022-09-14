import { Request, Response } from 'express';
import { InternalServerError } from '../errors';
import * as ProductService from '../services/Product.service';

export const getAll = async (_req: Request, res: Response): Promise<Response> => {
  const products = await ProductService.getAll();

  if (products instanceof Error) {
    return res
      .status(InternalServerError.code)
      .json({ message: InternalServerError.message });
  }

  return res.status(200).json(products);
};

export const getById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const product = await ProductService.getById(id);

  if (product instanceof Error) {
    return res
      .status(InternalServerError.code)
      .json({ message: InternalServerError.message });
  }

  return res.status(200).json(product);
};

export const create = async (req: Request, res: Response): Promise<Response> => {
  const product = await ProductService.create(req.body);

  if (product instanceof Error) {
    return res
      .status(InternalServerError.code)
      .json({ message: InternalServerError.message });
  }

  return res.status(201).json(product);
};
