import { BaseSequelizeRepositoryInterface } from "../baseSequelizeRepositoryInterface";
export interface UserRoleRepositoryInterface
  extends BaseSequelizeRepositoryInterface {
  updateWhere(attributes: object, data: object, include: object): Promise<any>;
}
