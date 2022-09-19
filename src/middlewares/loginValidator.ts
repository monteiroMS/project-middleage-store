import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const validations = schema.validate(req.body);

  if (validations.error) {
    const [{ message }] = validations.error.details;
    return res.status(400).json({ message });
  }

  next();
};

export default loginValidator;
