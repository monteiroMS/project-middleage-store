import { IOrderBeforeSerialize } from '../interfaces';
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

export default getAll;
