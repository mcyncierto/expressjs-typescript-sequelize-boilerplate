import { BaseRoute } from "./baseRoute";
import BaseValidator from "../helpers/validators/baseValidator";
import AuthenticateValidator from "../helpers/validators/auth/authenticateValidator";
import AuthController from "../controllers/authController";

class AuthRoute extends BaseRoute {
  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/login",
      AuthenticateValidator.getValidationRules(),
      BaseValidator.validate,
      AuthController.authenticate
    );
  }
}

export default AuthRoute;
