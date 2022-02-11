import { IURLService, URLService } from "@services";
import { Request, Response, NextFunction } from "express";

class URLController {
  constructor(private readonly service: IURLService) {
    this.encode = this.encode.bind(this);
    this.decode = this.decode.bind(this);
  }

  encode(req: Request, res: Response, next: NextFunction) {
    const { data, error } = this.service.encode(req.body.url);
    if (error) {
      return next(error);
    }
    return res.status(201).send(data);
  }

  decode(req: Request, res: Response) {
    return res.status(200).send(this.service.decode(req.body.hash).data);
  }
}

export default new URLController(URLService);
