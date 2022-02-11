import { ILayersContract } from "@types";
import { IURLEntityProps, URLEntity } from "@domain";
import { IURLRepo, URLRepo } from "@infra";

interface IURLService {
  encode: (url: string) => ILayersContract<IURLEntityProps>;
}

class URLService implements IURLService {
  constructor(private repo: IURLRepo) {}

  encode(url: string) {
    const urlEntity = new URLEntity({ url }).generateHash();
    return this.repo.add(urlEntity);
  }
}

export default new URLService(URLRepo);
