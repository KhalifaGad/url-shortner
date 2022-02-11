import { URLEntity } from "@domain";
import { ILayersContract } from "@types";
import { URLData } from "../../data";
import { IRepo } from "../types";

class URLRepo implements IRepo<URLEntity> {
  add(url: URLEntity): ILayersContract<URLEntity> {
    if (this.exist(url.hash)) {
      return { error: new Error("SOME ERROR") };
    }
    URLData.set(url.hash, url);
    return { data: url };
  }
  get: (id: string) => ILayersContract<URLEntity>;
  exist(hash: string): ILayersContract<URLEntity, boolean> {
    return { data: URLData.has(hash) };
  }
}

export default new URLRepo();
