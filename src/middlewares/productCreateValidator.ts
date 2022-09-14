import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.string().required(),
});

const productCreateValidator = (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return res.status(400).json({ message });
  }

  next();
};

export default productCreateValidator;
