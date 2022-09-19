export interface IError {
  message: string,
  code: number,
}

export interface IProduct {
  id?: number,
  name: string,
  amount: string,
  orderId?: number,
}

export interface IProductRequest {
  name: string,
  amount: string,
}

export interface ILoginRequest {
  username: string,
  password: string,
}

export interface IUserCreateRequest {
  username: string,
  classe: string,
  level: number,
  password: string,
}

export interface IUser {
  id?: number,
  username: string,
  classe: string,
  level: number,
  password?: string,
}

export interface IOrder {
  id: number,
  userId: number,
  productsIds: number[],
}

export interface IOrderBeforeSerialize {
  id: number,
  userId: number,
  productsIds: number,
}

export interface IJWTResult {
  id: number,
  username: string,
  iat: number,
  exp: number,
}

export interface IResultCreateOrder {
  userId: number,
  productsIds: number[],
}

export interface ICreateOrderRequest {
  userId: number,
  productsIds: number[],
}
