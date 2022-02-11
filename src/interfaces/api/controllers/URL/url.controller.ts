import { IURLService, URLService } from "@services";
import { Request, Response, NextFunction } from "express";

class URLController {
  constructor(private service: IURLService) {}

  encode(req: Request, res: Response, next: NextFunction) {
    const { data, error } = this.service.encode(req.body.url);
    if (error) {
      return next(error);
    }
    return res.status(201).json(data);
  }
}

export default new URLController(URLService);
