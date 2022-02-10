import { HashService } from "../../services";

export interface IURLEntityProps {
  url: string;
  hash?: string;
  createdAt?: Date;
}

export interface IURLEntity extends IURLEntityProps {
  generateHash(): string;
}

class URLEntity implements IURLEntity {
  private _url: string;
  private _hash?: string;
  private _createdAt?: Date;

  constructor({ url, hash, createdAt }: IURLEntityProps) {
    this.url = url;
    this.hash = hash;
    this.createdAt = createdAt;
  }

  get url() {
    return this._url;
  }

  set url(val: string) {
    this._url = val;
  }

  get hash() {
    return this._hash;
  }

  set hash(val: string) {
    this._hash = val;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(val: Date) {
    this._createdAt = val;
  }

  generateHash(): string {
    this.hash = HashService.generateHash();
    return this.hash;
  }
}

export default URLEntity;
