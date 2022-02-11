import { ILayersContract } from "@types";
import { IURLEntityProps, URLEntity } from "@domain";
import { IURLRepo, URLRepo } from "@infra";

export interface IURLService {
  encode: (url: string) => ILayersContract<IURLEntityProps>;
}

class URLService implements IURLService {
  constructor(private repo: IURLRepo) {}

  encode(url: string) {
    const urlEntity = new URLEntity({ url }).generateHash();
    const { data, error } = this.repo.add(urlEntity);
    if (error) return { error };
    return { data: data.getEntity() };
  }
}

export default new URLService(URLRepo);
