import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/postService";
import { PostTransformer } from "../helpers/transformers/postTransformer";

const postTransformer = new PostTransformer();
class PostController {
  /**
   * Creates a new post.
   *
   * @param {Request} req - The Express request object.
   * @param {string} req.body.title - The title of the post.
   * @param {string} req.body.content - The content of the post.
   * @param {Response} res - The Express response object.
   * @param {Next} next - The Express next function to handle errors.
   * @returns {Promise<void>} - A promise that resolves once the response is sent.
   */
  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const post = await PostService.create(req);
      const data = postTransformer.resource(post, false, ["id"]);

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }
}

export default PostController;
