export class GeneralException extends Error {
  statusCode: number;
  code: string;
  errors: any;

  constructor(error: any, statusCode: number = 500, stack = "") {
    super(error.message || error);
    this.statusCode = statusCode;
    this.code = error.code;
    this.errors = error.errors || error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
