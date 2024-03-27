import { BaseRoute } from "./baseRoute";
import HealthCheckController from "../controllers/healthCheckController";

class HealthCheckRoute extends BaseRoute {
  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/app", HealthCheckController.healthCheckApp);
    this.router.get("/db", HealthCheckController.healthCheckDb);
  }
}

export default HealthCheckRoute;
