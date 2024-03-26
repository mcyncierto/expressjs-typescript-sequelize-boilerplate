import express, { Router } from "express";
import HealthCheckRoute from "./healthCheckRoute";
import PostRoute from "./postRoute";

class Routes {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use("/healthcheck", new HealthCheckRoute().router);
    this.router.use("/posts", new PostRoute().router);
    // Add more routes here as needed
  }
}

export default new Routes().router;
