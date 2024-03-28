import { body } from "express-validator";

class AuthenticateValidator {
  static getValidationRules() {
    return [
      body("username").trim().notEmpty().withMessage("Username is required"),
      body("password").trim().notEmpty().withMessage("Password is required"),
    ];
  }
}

export default AuthenticateValidator;
