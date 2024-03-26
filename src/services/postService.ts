import models from "../database/models";
import { PostRepository } from "../repositories/postRepository";
import { PostType } from "../helpers/types/postType";
import { NotFoundException } from "../exceptions/notFoundException";

const { Post } = models;
const postRepository = new PostRepository(Post);

export class PostService {
  /**
   * Creates a new post.
   *
   * @param {object} req - The request object.
   * @param {string} req.body.title - The title of the post.
   * @param {string} req.body.content - The content of the post.
   * @returns {Promise<PostType>} A Promise that resolves with the created post.
   *
   * @throws {GeneralException} Throws an error if the post creation fails.
   */
  static async create(req: {
    body?: {
      title: string;
      content: string;
    };
  }): Promise<PostType> {
    const { title, content } = req.body!;

    const data = {
      title: title.trim(),
      content: content.trim() ?? "",
    };

    return await postRepository.create(data);
  }
}
