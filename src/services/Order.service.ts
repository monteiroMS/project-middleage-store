import * as OrderModel from '../models/Order.model';
import { ICreateOrderRequest, IOrder, IOrderBeforeSerialize } from '../interfaces';

const makeItIOrder = ({ id, userId, productsIds }: IOrderBeforeSerialize): IOrder => ({
  id,
  userId,
  productsIds: [productsIds],
});

const serialize = (orders: IOrder[]) => {
  const serializedOrders: IOrder[] = [];
  orders.forEach((order) => {
    const index = serializedOrders.findIndex(({ id }) => id === order.id);
    if (index !== -1) {
      serializedOrders[index].productsIds = [
        ...serializedOrders[index].productsIds,
        ...order.productsIds,
      ];
    } else {
      serializedOrders.push(order);
    }
  });
  return serializedOrders;
};

export const getAll = async () => {
  const orders = await OrderModel.getAll();
  const result = orders.map(makeItIOrder);
  return serialize(result);
};

export const create = async (createOrderReq: ICreateOrderRequest) => {
  const result = await OrderModel.create(createOrderReq);
  return result;
};

export default getAll;
