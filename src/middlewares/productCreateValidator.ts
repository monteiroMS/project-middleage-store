import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const productCreateValidator = (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return message.includes('is required')
      ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

export default productCreateValidator;
