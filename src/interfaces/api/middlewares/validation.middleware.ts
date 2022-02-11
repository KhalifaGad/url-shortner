import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validationware =
  (objectName: "body" | "params", schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req[objectName]);
      next();
    } catch (err) {
      next(err);
    }
  };
