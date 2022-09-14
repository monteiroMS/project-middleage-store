import { Request, Response } from 'express';
import { InternalServerError, InvalidFields } from '../errors';
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

export const getAll = async (_req: Request, res: Response) => {
  const users = await UserService.getAll();

  if (users instanceof Error) {
    return res.status(InternalServerError.code).json(InternalServerError.message);
  }

  return res.status(200).json(users);
};
