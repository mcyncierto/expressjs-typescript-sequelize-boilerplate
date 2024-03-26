import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.handleUnknownRoutes();
    // You can add more initialization logic here if needed
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.options("*", cors()); // handle preflight requests
  }

  private initializeRoutes(): void {
    this.app.use("/", routes);
  }

  private handleUnknownRoutes(): void {
    // This middleware handles unknown routes by returning a 404 error
    this.app.use((req, res) => {
      res.status(404).json({ error: "Not found" });
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default Server;
