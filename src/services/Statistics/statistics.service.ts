import { IStatisticsRepo, StatisticsRepo } from "@infra";
import { ILayersContract, IURLStatistic, IURLVisit } from "@types";
import { GeolocationService, IGeolocationService } from "../Geolocation";

export interface IStatisticsService {
  urlVisited(hash: string, ip: string | number): void;
  getStatistics(hash: string): ILayersContract<IURLStatistic>;
}

class StatisticsService implements IStatisticsService {
  constructor(
    private repo: IStatisticsRepo,
    private goelocationServise: IGeolocationService
  ) {}

  urlVisited(hash: string, ip: string) {
    const geolocation = this.goelocationServise.lookup(ip);

    const visit: IURLVisit = {
      ip,
      country: geolocation?.country,
      city: geolocation?.city,
    };
    this.repo.addVisit(hash, visit);
  }

  getStatistics(hash: string) {
    return this.repo.get(hash);
  }
}

export default new StatisticsService(StatisticsRepo, GeolocationService);
