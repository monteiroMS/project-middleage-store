import { InvalidFields } from '../errors';
import { ILoginRequest, IUserCreateRequest } from '../interfaces';
import * as UserModel from '../models/User.model';

export const create = async (user: IUserCreateRequest) => {
  try {
    const token = await UserModel.create(user);

    if (!token) throw new Error();

    return token;
  } catch (error) {
    console.log(error);
    return InvalidFields;
  }
};

export const getAll = async () => {
  const users = await UserModel.getAll();
  return users;
};

export const login = async (loginReq: ILoginRequest) => {
  const token = await UserModel.login(loginReq);
  return token;
};
