import {
  IURLService,
  URLService,
  IStatisticsService,
  StatisticsService,
} from "@services";
import { Request, Response } from "express";

class MappingController {
  constructor(
    private readonly urlService: IURLService,
    private readonly statisticsService: IStatisticsService
  ) {
    this.map = this.map.bind(this);
  }

  map(req: Request, res: Response) {
    const hash = req.params.hash;
    const { data } = this.urlService.decode(req.params.hash);
    if (!data) {
      return res.status(404).send({ error: "Not Found!" });
    }
    this.statisticsService.urlVisited(hash, req.ip);
    return res.redirect(data.url);
  }
}

export default new MappingController(URLService, StatisticsService);
