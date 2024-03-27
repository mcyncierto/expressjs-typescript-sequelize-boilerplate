const NodeEnvironment = require("jest-environment-node").TestEnvironment;

import { Sequelize } from "sequelize";
import Server from "../../src/server";

let appServer: any;
let sequelize: any;
const server = new Server();

class IntegrationTestEnvironment extends NodeEnvironment {
  constructor(config: any, context: any) {
    super(config, context);
  }

  async setup() {
    appServer = server.app.listen(+process.env.TEST_APP_PORT!);

    sequelize = new Sequelize(
      process.env.TEST_DB_NAME!,
      process.env.TEST_DB_USER!,
      process.env.TEST_DB_PASSWORD,
      {
        host: process.env.TEST_DB_HOST,
        dialect: "postgres",
      }
    );

    await sequelize.authenticate();

    await super.setup();
  }

  async teardown() {
    await appServer.close();
    await sequelize.close();

    await super.teardown();
  }

  runScript(script: any) {
    return super.runScript(script);
  }
}

module.exports = IntegrationTestEnvironment;
