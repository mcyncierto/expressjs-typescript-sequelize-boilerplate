import express, { Router } from "express";
import PostController from "../controllers/postController";
class PostRoute {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", PostController.create);
  }
}

export default PostRoute;
