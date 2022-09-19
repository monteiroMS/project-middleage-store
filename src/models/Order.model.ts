import { ResultSetHeader } from 'mysql2';
import { ICreateOrderRequest, IOrderBeforeSerialize, IResultCreateOrder } from '../interfaces';
import connection from './connection';

export const getAll = async (): Promise<IOrderBeforeSerialize[]> => {
  const [orders] = await connection.execute(`
    SELECT
      O.id,
      O.userId,
      P.id as productsIds
    FROM Trybesmith.Orders AS O
    INNER JOIN Trybesmith.Products AS P
    WHERE O.id = P.orderId;
  `);
  return orders as IOrderBeforeSerialize[];
};

export const create = async ({ userId, productsIds }: ICreateOrderRequest) => {
  const [orders] = await connection.execute(`
    INSERT INTO Trybesmith.Orders (userId)
    VALUES (?);
  `, [userId]);

  const { insertId } = orders as ResultSetHeader;

  await Promise.all(
    productsIds.map(async (productId: number) => {
      const result = await connection.execute(`
        UPDATE Trybesmith.Products
        SET orderId = ?
        WHERE id = ?;
      `, [insertId, productId]);
      return result;
    }),
  );

  return { userId, productsIds } as IResultCreateOrder;
};

export default getAll;
