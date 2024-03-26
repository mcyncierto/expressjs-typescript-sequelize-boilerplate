import { BaseSequelizeRepository } from "./baseSequelizeRepository";
import { PostRepositoryInterface } from "./interfaces/postRepositoryInterface";

export class PostRepository
  extends BaseSequelizeRepository
  implements PostRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }
}
