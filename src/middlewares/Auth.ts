import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IJWTResult } from '../interfaces';

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'password';
const NOT_FOUND_MESSAGE = 'Token not found';
const INVALID_TOKEN_MESSAGE = 'Invalid token';

interface AuthRequest extends Request {
  userId?: number,
}

const authenticator = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: NOT_FOUND_MESSAGE });
    }

    const result = jwt.verify(authorization, JWT_SECRET);

    const { id } = result as IJWTResult;
    
    req.userId = id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: INVALID_TOKEN_MESSAGE,
    });
  }
};

export default authenticator;
