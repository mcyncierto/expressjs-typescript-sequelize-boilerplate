import models from "../database/models";

const { sequelize } = models;

class HealthCheckService {
  static async healthCheckApp() {
    return { appStatus: "OK" };
  }

  static async healthCheckDb() {
    try {
      await sequelize.authenticate();
      return { dbStatus: "ok" };
    } catch (error) {
      return { dbStatus: "error" };
    }
  }
}

export default HealthCheckService;
