import { BaseRoute } from "./baseRoute";
import BaseValidator from "../helpers/validators/baseValidator";
import CreatePostValidator from "../helpers/validators/post/createPostValidator";
import PostController from "../controllers/postController";
class PostRoute extends BaseRoute {
  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      "/",
      CreatePostValidator.getValidationRules(),
      BaseValidator.validate,
      PostController.create
    );
  }
}

export default PostRoute;
