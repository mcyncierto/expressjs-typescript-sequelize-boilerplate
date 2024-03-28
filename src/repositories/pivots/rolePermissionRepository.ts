import { BaseSequelizeRepository } from "../baseSequelizeRepository";
import { RolePermissionRepositoryInterface } from "../interfaces/pivots/rolePermissionRepositoryInterface";

export class RolePermissionRepository
  extends BaseSequelizeRepository
  implements RolePermissionRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }
}
