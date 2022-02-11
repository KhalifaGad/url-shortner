import { ExceptionHandlerService } from "@services";
import { ErrorRequestHandler } from "express";
import Joi from "joi";
export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return res.status(422).json({ error: err.message });
  }
  const { message, isInternal } = new ExceptionHandlerService(err).info;
  const statusCode = isInternal ? 500 : 400;
  res.status(statusCode).json({ error: message });
};
