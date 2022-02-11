import { ExceptionHandlerService } from "@services";
import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const { message, isInternal } = new ExceptionHandlerService(err).info;
  const statusCode = isInternal ? 500 : 400;
  res.status(statusCode).json({ error: message });
};
