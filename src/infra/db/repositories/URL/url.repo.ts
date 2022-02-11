import { IURLEntity, URLEntity } from "@domain";
import { ILayersContract } from "@types";
import { URLData } from "../../data";
import { DuplicateKeyException } from "../../exceptions";
import { BaseException } from "../../exceptions/baseException";
import { IRepo } from "../types";

class URLRepo implements IRepo<IURLEntity> {
  add(url: IURLEntity): ILayersContract<IURLEntity> {
    const error = this.validate(url);
    if (error) return { error };
    URLData.set(url.hash, url);
    return { data: url };
  }

  get: (id: string) => ILayersContract<IURLEntity, undefined>;

  private validate(entity: IURLEntity): BaseException | undefined {
    if (!this.isUniqueHash(entity.url))
      return new DuplicateKeyException("hash already exist", {
        isInternal: true,
        context: `${entity.hash} has been duplicated!`,
      });
    if (this.isExist(entity))
      return new DuplicateKeyException("url already exist");
  }

  private isExist(entity: IURLEntity) {
    const rawURL = URLData.get(entity.hash);
    const existedEntity = new URLEntity({ ...rawURL });
    return entity.equals(existedEntity);
  }

  private isUniqueHash(hash: string) {
    return !URLData.has(hash);
  }
}

export default new URLRepo();
