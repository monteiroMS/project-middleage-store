import { Request, Response } from 'express';
import { InternalServerError, InvalidFields } from '../errors';
import * as UserService from '../services/User.service';

export const LOGIN_INVALID_FIELDS = 'Username or password invalid';

export const create = async (req: Request, res: Response) => {
  const token = await UserService.create(req.body);

  if (token instanceof Error) {
    return res
      .status(400)
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

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const token = await UserService.login({ username, password });
  
  if (token instanceof Error) {
    return res.status(401).json({
      message: LOGIN_INVALID_FIELDS,
    });
  }

  return res.status(200).json({ token });
};
