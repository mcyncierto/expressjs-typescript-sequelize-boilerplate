import { BaseRoute } from "./baseRoute";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

class SwaggerRoute extends BaseRoute {
  public swaggerOptions: Options;
  public specs: object;

  constructor() {
    super();
    this.swaggerOptions = {
      swaggerDefinition: {
        openapi: "3.0.0",
        components: {},
        info: {
          title: "Project Name API",
          version: "1.0.0",
          description: "API endpoints",
        },
        externalDocs: {
          description: "Download swagger.json",
          url: "/docs/swagger.json",
        },
      },
      apis: ["./src/docs/*.ts"],
    };
    this.specs = swaggerJsDoc(this.swaggerOptions);
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.use("/", swaggerUi.serve);

    this.router.get(
      "/",
      swaggerUi.setup(this.specs, {
        explorer: true,
      })
    );

    this.router.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(this.specs);
    });
  }
}

export default SwaggerRoute;
