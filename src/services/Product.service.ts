import { InternalServerError } from '../errors';
import { IError, IProduct, IProductRequest } from '../interfaces';
import * as ProductModel from '../models/Product.model';

export const getAll = async (): Promise<IProduct[] | IError> => {
  try {
    const products = await ProductModel.getAll();

    if (!products) throw new Error();

    return products as IProduct[];
  } catch (error: unknown) {
    return InternalServerError;
  }
};

export const getById = async (id: string): Promise<IProduct[] | IError> => {
  try {
    const product = await ProductModel.getById(id);

    if (!product) throw new Error();

    return product as IProduct[];
  } catch (error) {
    return InternalServerError;
  }
};

export const create = async (product: IProductRequest) => {
  try {
    const id = await ProductModel.create(product);

    if (!id) throw new Error();

    return { id, ...product };
  } catch (error) {
    return InternalServerError;
  }
};
