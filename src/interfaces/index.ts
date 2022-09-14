export interface IInternalError {
  message: string,
  code: number,
}

export interface IProduct {
  id?: number,
  name: string,
  amount: string,
  orderId?: number,
}
