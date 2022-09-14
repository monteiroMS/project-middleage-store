import { InternalServerError } from '../errors';
import { IInternalError, IProduct } from '../interfaces';
import connection from './connection';

export const getAll = async (): Promise<IProduct[] | IInternalError> => {
  try {
    const [result] = await connection.execute(`
      SELECT * FROM Trybesmith.Products;
    `);

    if (!result) throw new Error();

    return result as IProduct[];
  } catch (error: unknown) {
    console.log(error);
    return InternalServerError;
  }
};

export const getById = async (id: string): Promise<IProduct[] | IInternalError> => {
  try {
    const [result] = await connection.execute(`
      SELECT * FROM Trybesmith.Products
      WHERE id = ?;
    `, [id]);

    if (!result) throw new Error();

    return result as IProduct[];
  } catch (error: unknown) {
    return InternalServerError;
  }
};
