import Server from "./server";
import dotenv from "dotenv";

class App {
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  public start(port: number): void {
    this.server.start(port);
  }
}

dotenv.config();
const app = new App();

const port: number = +process.env.APP_PORT! || 3002;
app.start(port);
