import { BaseSequelizeRepository } from "./baseSequelizeRepository";
import { UserRepositoryInterface } from "./interfaces/userRepositoryInterface";

export class UserRepository
  extends BaseSequelizeRepository
  implements UserRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }
}
