import { InternalServerError } from '../errors';
import { IInternalError, IProduct } from '../interfaces';
import * as ProductModel from '../models/Product.model';

export const getAll = async (): Promise<IProduct[] | IInternalError> => {
  try {
    const products = await ProductModel.getAll();

    if (!products) throw new Error();

    return products as IProduct[];
  } catch (error: unknown) {
    return InternalServerError;
  }
};

export const getById = async (id: string): Promise<IProduct[] | IInternalError> => {
  try {
    const product = await ProductModel.getById(id);

    if (!product) throw new Error();

    return product as IProduct[];
  } catch (error) {
    return InternalServerError;
  }
};
