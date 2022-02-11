import { IURLService, URLService } from "@services";
import { Request, Response } from "express";

class MappingController {
  constructor(private readonly service: IURLService) {
    this.map = this.map.bind(this);
  }

  map(req: Request, res: Response) {
    const { data } = this.service.decode(req.params.hash);
    if (!data) {
      return res.status(404).send({ error: "Not Found!" });
    }
    return res.redirect(data.url);
  }
}

export default new MappingController(URLService);
