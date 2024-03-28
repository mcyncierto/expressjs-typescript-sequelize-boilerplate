import { BaseSequelizeRepository } from "./baseSequelizeRepository";
import { PermissionRepositoryInterface } from "./interfaces/permissionRepositoryInterface";

export class PermissionRepository
  extends BaseSequelizeRepository
  implements PermissionRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }
}
