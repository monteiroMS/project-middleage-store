import { Request, Response } from 'express';
import { InvalidFields } from '../errors';
import * as UserService from '../services/User.service';

export const create = async (req: Request, res: Response) => {
  const token = await UserService.create(req.body);

  if (token instanceof Error) {
    return res
      .status(InvalidFields.code)
      .json({ message: InvalidFields.message });
  }

  return res.status(201).json({ token });
};

export default create;
