import { ResultSetHeader } from 'mysql2';
import { InternalServerError } from '../errors';
import { IInternalError, IProduct, IProductRequest } from '../interfaces';
import connection from './connection';

const getId = (item: ResultSetHeader): number => item.insertId;

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

export const create = async (
  { name, amount }: IProductRequest,
): Promise<number | IInternalError> => {
  try {
    const [result] = await connection.execute(`
      INSERT INTO Trybesmith.Products (name, amount)
      VALUES (?, ?);
    `, [name, amount]);

    if (!result) throw new Error();
    
    return getId(result as ResultSetHeader);
  } catch (error: unknown) {
    return InternalServerError;
  }
};
