import express, { Router } from "express";
import HealthCheckController from "../controllers/healthCheckController";

class HealthCheckRoute {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/app", HealthCheckController.healthCheckApp);
    this.router.get("/db", HealthCheckController.healthCheckDb);
  }
}

export default HealthCheckRoute;
