import { ResultSetHeader } from 'mysql2';
import { InternalServerError } from '../errors';
import { IError, IProduct, IProductRequest } from '../interfaces';
import connection from './connection';

export const getId = (item: ResultSetHeader): number => item.insertId;

export const getAll = async (): Promise<IProduct[] | IError> => {
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

export const getById = async (id: string): Promise<IProduct[] | IError> => {
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

export const create = async ({ name, amount }: IProductRequest): Promise<number> => {
  const [result] = await connection.execute(`
    INSERT INTO Trybesmith.Products (name, amount)
    VALUES (?, ?);
  `, [name, amount]);

  const { insertId } = result as ResultSetHeader;

  return insertId;
};
