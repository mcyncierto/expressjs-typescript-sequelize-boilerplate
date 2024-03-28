import { Request, Response, NextFunction } from "express";

class ErrorHandler {
  static handle(
    err: { statusCode: number; message: string; stack: object },
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const nodeEnv: string = process.env.NODE_ENV!;
    const errStatus: number = err.statusCode || 500;
    const errMsg: string =
      !["development", "test"].includes(nodeEnv) && errStatus >= 500
        ? "Something went wrong. Please contact system administrator"
        : err.message;

    let error: { status: number; message: string; stack?: object } = {
      status: errStatus,
      message: errMsg,
    };

    if (nodeEnv === "development") {
      error.stack = err.stack;
    }

    res.status(errStatus).json(error);
  }
}

export default ErrorHandler;
