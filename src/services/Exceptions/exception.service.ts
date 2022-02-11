import { BaseException } from "@infra";
import { Exception } from "@types";

class ExceptionHandlerService {
  exception: any;
  private _isDatabaseError: boolean;
  private _isInternal: boolean;
  private readonly INTERNAL_ERROR_MESSAGE =
    "it's not you, it's us, working on fixing it :(";
  message: string;

  constructor(exception: any) {
    this.exception = exception;
    this.checkIsDatabaseError();
    if (this.isDatabaseError) {
      this.checkIsInternal();
    }
    this.setMessage();
  }

  get info() {
    return {
      message: this.message,
      isDatabaseError: this.isDatabaseError,
      isInternal: this.isInternal,
    };
  }

  get isDatabaseError() {
    return this._isDatabaseError;
  }

  get isInternal() {
    return this._isInternal;
  }

  checkIsDatabaseError() {
    this._isDatabaseError = this.exception instanceof BaseException;
    return this.isDatabaseError;
  }

  checkIsInternal() {
    this._isInternal = this.exception?.metadata.isInternal;
    return this.isInternal;
  }

  private setMessage() {
    this.message = this.exception?.message;
    if (this.isDatabaseError && this.isInternal) {
      this.message = this.INTERNAL_ERROR_MESSAGE;
    }
  }
}

export default ExceptionHandlerService;
