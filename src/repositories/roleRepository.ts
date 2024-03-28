import { BaseSequelizeRepository } from "./baseSequelizeRepository";
import { RoleRepositoryInterface } from "./interfaces/roleRepositoryInterface";

export class RoleRepository
  extends BaseSequelizeRepository
  implements RoleRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }
}
