import { ILayersContract, IURLStatistic, IURLVisit } from "@types";
import { StatisticsData } from "../../data";
import { IRepo } from "../types";

export interface IStatisticsRepo extends IRepo<IURLStatistic> {
  addVisit(hash: string, visit: IURLVisit): ILayersContract<IURLStatistic>;
  upsert(data: IURLStatistic): ILayersContract<IURLStatistic>;
}

class StatisticsRepo implements IRepo<IURLStatistic> {
  add({ hash, visits }: IURLStatistic): ILayersContract<IURLStatistic> {
    const rawData = {
      hash,
      visits: visits.map((visit) => {
        visit.createdAt = new Date();
        return visit;
      }),
    };
    StatisticsData.set(hash, rawData.visits);
    return { data: rawData };
  }

  get(hash: string): ILayersContract<IURLStatistic> {
    const visits = StatisticsData.get(hash);
    if (!visits) {
      return { data: undefined };
    }
    return { data: { hash, visits } };
  }

  upsert(data: IURLStatistic): ILayersContract<IURLStatistic> {
    if (!this.isExist(data.hash)) {
      return this.add(data);
    }
    StatisticsData.set(data.hash, data.visits);
    return { data };
  }

  addVisit(hash: string, visit: IURLVisit): ILayersContract<IURLStatistic> {
    visit.createdAt = new Date();
    const { data: rawData } = this.get(hash);
    if (rawData) {
      rawData.visits.push(visit);
      return this.upsert(rawData);
    }
    return this.add({ hash, visits: [visit] });
  }

  private isExist(hash: string) {
    return StatisticsData.has(hash);
  }
}

export default new StatisticsRepo();
