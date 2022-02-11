import geoip, { Lookup } from "geoip-lite";

export interface IGeolocationService {
  lookup(ip: string | number): Lookup | null;
}

class GeolocationService implements IGeolocationService {
  lookup(ip: string | number) {
    return geoip.lookup(ip);
  }
}

export default new GeolocationService();
