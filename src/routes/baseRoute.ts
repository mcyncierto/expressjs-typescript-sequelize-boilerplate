import express, { Router } from "express";

export class BaseRoute {
  /**
   * These declarations are to make api versioning easier.
   */
  protected basePrefix = "/api";
  protected version1Prefix = "/v1";

  // Add other endpoint versions here...

  public router: Router;

  constructor() {
    this.router = express.Router();
  }
}
