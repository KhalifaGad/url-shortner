import { BaseException } from "./baseException";
import { DUPLICATE_KEY } from "./constants";

class DuplicateKeyException extends BaseException {
  readonly code = DUPLICATE_KEY;
  constructor(message: string, metadata?: any) {
    super(message);
    this.metadata = metadata;
  }
}

export { DuplicateKeyException, BaseException };
