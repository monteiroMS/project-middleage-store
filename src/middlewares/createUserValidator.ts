import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const createUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const validations = schema.validate(req.body);

  if (validations.error) {
    const [{ message }] = validations.error.details;
    return message.includes('is required')
      ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

export default createUserValidator;
