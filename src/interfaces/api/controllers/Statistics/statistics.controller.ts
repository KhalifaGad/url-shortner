import { IStatisticsService, StatisticsService } from "@services";
import { Request, Response } from "express";

class StatisticsController {
  constructor(private readonly service: IStatisticsService) {
    this.getStatistics = this.getStatistics.bind(this);
  }

  getStatistics(req: Request, res: Response) {
    const { data } = this.service.getStatistics(req.params.hash);
    if (!data) {
      return res
        .status(404)
        .send({ error: "No available statistics for this url yet!" });
    }
    return res.status(200).send(data);
  }
}

export default new StatisticsController(StatisticsService);
