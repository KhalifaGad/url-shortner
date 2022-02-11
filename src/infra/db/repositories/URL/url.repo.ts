import { IURLEntity, URLEntity } from "@domain";
import { ILayersContract } from "@types";
import { URLData } from "../../data";
import { DuplicateKeyException } from "../../exceptions";
import { BaseException } from "../../exceptions/baseException";
import { IRepo } from "../types";

export type IURLRepo = IRepo<IURLEntity>;

class URLRepo implements IRepo<IURLEntity> {
  add(url: IURLEntity): ILayersContract<IURLEntity> {
    const error = this.validate(url);
    if (error) return { error };
    url.createdAt = new Date();
    const rawData = url.getEntity();
    delete rawData.hash;
    URLData.set(url.hash, rawData);
    return { data: url };
  }

  get(hash: string): ILayersContract<IURLEntity> {
    const rawData = URLData.get(hash);
    if (!rawData) return { data: undefined };
    return { data: new URLEntity({ ...rawData, hash }) };
  }

  private validate(entity: IURLEntity): BaseException | undefined {
    if (!this.isUniqueHash(entity.url))
      return new DuplicateKeyException("hash already exist", {
        isInternal: true,
        context: `${entity.hash} has been duplicated!`,
      });
    if (this.isExist(entity))
      return new DuplicateKeyException("URL already exist");
  }

  private isExist(entity: IURLEntity) {
    for (const [, { url }] of URLData) {
      if (entity.equals(url)) {
        return true;
      }
    }
    return false;
  }

  private isUniqueHash(hash: string) {
    return !URLData.has(hash);
  }
}

export default new URLRepo();
