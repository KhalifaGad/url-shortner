import Joi from "joi";

const hashValidation = Joi.string()
  .regex(/[A-Za-z0-9.-=]+/)
  .length(8);

export const encodeURLSchema = Joi.object({
  url: Joi.string().uri(),
});

export const hashSchema = Joi.object({
  hash: hashValidation,
});
