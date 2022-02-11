import { IURLService, URLService } from "@services";
import { Request, Response, NextFunction } from "express";

class URLController {
  constructor(private readonly service: IURLService) {
    this.encode = this.encode.bind(this);
  }

  encode(req: Request, res: Response, next: NextFunction) {
    const { data, error } = this.service.encode(req.body.url);
    if (error) {
      return next(error);
    }
    return res.status(201).send(data);
  }
}

export default new URLController(URLService);
