import { Request, Response } from "express";
import HealthCheckService from "../services/healthCheckService";

class HealthCheckController {
  /**
   * Perform a health check operation and return the result.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   * @returns {Promise<void>} - A promise that resolves with the health check result.
   */
  static async healthCheckApp(req: Request, res: Response): Promise<void> {
    const result: { appStatus: string } =
      await HealthCheckService.healthCheckApp();
    res.status(200).json(result);
  }

  /**
   * Perform a database health check operation and return the result.
   *
   * @param {Request} req - The Restify request object.
   * @param {Response} res - The Restify response object.
   * @returns {Promise<void>} - A promise that resolves with the database health check result.
   */
  static async healthCheckDb(req: Request, res: Response): Promise<void> {
    const result = await HealthCheckService.healthCheckDb();
    res.status(200).json(result);
  }
}

export default HealthCheckController;
