import { IStatisticsRepo, StatisticsRepo } from "@infra";
import { IURLVisit } from "@types";
import { GeolocationService, IGeolocationService } from "../Geolocation";

export interface IStatisticsService {
  urlVisited: (hash: string, ip: string | number) => void;
  //   decode: (hash: string) => ILayersContract<IURLEntityProps>;
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
}

export default new StatisticsService(StatisticsRepo, GeolocationService);
