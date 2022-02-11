import { ILayersContract } from "@types";
import { IURLEntityProps, URLEntity } from "@domain";
import { IURLRepo, URLRepo } from "@infra";

export interface IURLService {
  encode: (url: string) => ILayersContract<IURLEntityProps>;
  decode: (hash: string) => ILayersContract<IURLEntityProps>;
}

class URLService implements IURLService {
  constructor(private repo: IURLRepo) {}

  encode(url: string) {
    const urlEntity = new URLEntity({ url }).generateHash();
    const { data, error } = this.repo.add(urlEntity);
    if (error) return { error };
    return { data: data.getEntity() };
  }

  decode(hash: string) {
    const { data } = this.repo.get(hash);
    return { data: data && data.getEntity() };
  }
}

export default new URLService(URLRepo);
