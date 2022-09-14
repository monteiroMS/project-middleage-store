import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().required(),
  classe: Joi.string().required(),
  level: Joi.number().required(),
  password: Joi.string().required(),
});

const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const validations = schema.validate(req.body);

  if (validations.error) {
    const [{ message }] = validations.error.details;
    return res.status(400).json({ message });
  }

  next();
};

export default createUserValidator;
