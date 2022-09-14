import { InvalidFields } from '../errors';
import { IUserCreateRequest } from '../interfaces';
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

export default create;
