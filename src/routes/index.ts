import { BaseRoute } from "./baseRoute";
import AuthRoute from "./authRoute";
import SwaggerRoute from "./docsRoute";
import HealthCheckRoute from "./healthCheckRoute";
import PostRoute from "./postRoute";

class Routes extends BaseRoute {
  private v1Endpoint: string = `${this.basePrefix}${this.version1Prefix}`;

  constructor() {
    super();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.use(`${this.v1Endpoint}/auth`, new AuthRoute().router);
    this.router.use(`${this.basePrefix}/docs`, new SwaggerRoute().router);
    this.router.use(
      `${this.v1Endpoint}/healthcheck`,
      new HealthCheckRoute().router
    );
    this.router.use(`${this.v1Endpoint}/posts`, new PostRoute().router);
    // Add more routes here as needed
  }
}

export default new Routes().router;
