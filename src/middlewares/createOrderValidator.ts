import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const schema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).required()
    .messages({
      'array.min': '"productsIds" must include only numbers',
    }),
});

const createOrderValidator = (req: Request, res: Response, next: NextFunction) => {
  const validation = schema.validate(req.body);

  if (validation.error) {
    const [{ message }] = validation.error.details;
    return message.includes('is required')
      ? res.status(400).json({ message })
      : res.status(422).json({ message });
  }

  next();
};

export default createOrderValidator;
