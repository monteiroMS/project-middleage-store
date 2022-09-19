import { IProduct, IProductRequest } from '../interfaces';
import * as ProductModel from '../models/Product.model';

export const getAll = async (): Promise<IProduct[]> => {
  const products = await ProductModel.getAll();
  return products as IProduct[];
};

export const getById = async (id: string): Promise<IProduct[]> => {
  const product = await ProductModel.getById(id);
  return product as IProduct[];
};

export const create = async (product: IProductRequest) => {
  const id = await ProductModel.create(product);
  return { id, ...product };
};
