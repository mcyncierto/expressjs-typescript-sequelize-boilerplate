import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

class BaseValidator {
  static validate(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
  }
}

export default BaseValidator;
