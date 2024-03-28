import { BaseSequelizeRepository } from "../baseSequelizeRepository";
import { UserRoleRepositoryInterface } from "../interfaces/pivots/userRoleRepositoryInterface";
import { NotFoundException } from "../../exceptions/notFoundException";

export class UserRoleRepository
  extends BaseSequelizeRepository
  implements UserRoleRepositoryInterface
{
  constructor(model: any) {
    super(model);
  }

  /**
   * Updates a record by attribute.
   *
   * @param {object} attributes - The attributes of the record to update.
   * @param {object} data - The data for updating the record.
   * @param {object} [include=[]] - Included associations.
   * @returns {Promise<any>} A Promise that resolves with the updated record.
   */
  async updateWhere(
    attributes: object,
    data: object,
    include: object = []
  ): Promise<any> {
    return this.model
      .update(data, {
        where: attributes,
      })
      .then(() => this.findOne(attributes, include));
  }
}
