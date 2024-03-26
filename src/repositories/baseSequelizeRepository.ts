import { NotFoundException } from "../exceptions/notFoundException";
import { BaseSequelizeRepositoryInterface } from "./interfaces/baseSequelizeRepositoryInterface";

/**
 * Base class for Sequelize repositories providing various operations.
 * @implements {BaseSequelizeRepositoryInterface}
 */
export class BaseSequelizeRepository
  implements BaseSequelizeRepositoryInterface
{
  /**
   * Creates an instance of BaseSequelizeRepository.
   *
   * @param {any} model - The Sequelize model to be used.
   */
  constructor(protected model: any) {
    this.model = model;
  }

  /**
   * Retrieves all records from the model.
   *
   * @param {object} [where={}] - The attributes or query parameters to search for.
   * @param {object} order - Sets the order of the retrieved records.
   * @param {object} [include=[]] - Included associations.
   * @param {object} [attributes={}] - The fields or columns to select/display.
   * @param {boolean} [raw=false] - To disable this wrapping and receive a plain response instead.
   * @param {number | null } [limit=null] - Limit the number of records to be retrieved.
   * @returns {Promise<any>} A Promise that resolves with an array of records.
   */
  async getAll(
    where: object = {},
    order: object = [["created_at", "DESC"]],
    include: object = [],
    attributes: object = {},
    raw: boolean = false,
    limit: number | null = null
  ): Promise<any> {
    let options = { where, order, include, attributes, raw };

    if (limit) {
      options = {
        ...options,
        ...{ limit },
      };
    }
    return this.model.findAll(options);
  }

  /**
   * Finds a record by its ID.
   *
   * @param {string} id - The ID of the record to find.
   * @returns {Promise<any | null>} A Promise that resolves with the found record or null if not found.
   */
  async findById(id: string): Promise<any | null> {
    return this.model.findByPk(id);
  }

  /**
   * Creates a new record.
   *
   * @param {object} data - The data for creating the record.
   * @param {object} [trans={}] - Transaction options for the creation.
   * @returns {Promise<any>} A Promise that resolves with the created record.
   */
  async create(data: object, trans: object = {}): Promise<any> {
    return this.model.create(data, trans);
  }

  /**
   * Updates a record by ID.
   *
   * @param {string} id - The ID of the record to update.
   * @param {object} data - The data for updating the record.
   * @param {object} [include=[]] - Included associations.
   * @returns {Promise<any>} A Promise that resolves with the updated record.
   */
  async update(id: string, data: object, include: object = []): Promise<any> {
    if ((await this.findById(id)) === null) {
      throw new NotFoundException();
    }

    return this.model
      .update(data, {
        where: { id },
      })
      .then(() => this.findOne({ id }, include));
  }

  /**
   * Deletes a record by ID.
   *
   * @param {string} id - The ID of the record to delete.
   * @returns {Promise<any>} A Promise that resolves with the deleted record.
   */
  async delete(id: string): Promise<any> {
    const record = await this.findById(id);
    if (record === null) {
      throw new NotFoundException();
    }

    return record.destroy();
  }

  /**
   * Finds the first record that matches the given attributes.
   *
   * @param {object} where - The attributes or query parameters to search for.
   * @param {object} [include=[]] - Included associations.
   * @param {object} [attributes={}] - The fields or columns to select/display.
   * @returns {Promise<any | null>  A Promise that resolves with the found record or null if not found.
   */
  async findOne(
    where: object,
    include: object = [],
    attributes: object = {}
  ): Promise<any | null> {
    const record = await this.model.findOne({
      where,
      include,
      attributes,
    });

    return record;
  }

  /**
   * Retrieves and counts records that match the given attributes with pagination support.
   *
   * @param {object} where - The attributes or query parameters to search for.
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} pageSize - The number of records to fetch per page (default is 10).
   * @param {object} [include={}] - Included associations.
   * @param {object} order - Sets the order of the retrieved records.
   * @param {boolean} [raw=false] - To disable this wrapping and receive a plain response instead.
   * @returns {Promise<any>} A Promise that resolves with an array of found records.
   */
  async paginate(
    where: object = {},
    page: number = 1,
    pageSize: number = 10,
    include: object = [],
    order: object = [["created_at", "DESC"]],
    attributes: any = null,
    raw: boolean = false
  ): Promise<any> {
    const limit = pageSize && pageSize >= 0 ? +pageSize : 10;
    const offset = page && page >= 0 ? (page - 1) * limit : 0;

    let options = {
      include: include,
      distinct: true,
      limit: limit,
      offset: offset,
      where: where,
      order: order,
      subQuery: false,
      raw: raw,
    };

    if (attributes) {
      options = {
        ...options,
        ...{ attributes },
      };
    }

    const record = await this.model.findAndCountAll(options);
    return record;
  }

  /**
   * Finds records that match the given attributes.
   *
   * @param {object} where - The attributes or query parameters to search for.
   * @param {object} [order=[["id", "DESC"]]] - Sets the order of the retrieved records.
   * @param {object} [queryOptions={}] - Additional query options.
   * @returns {Promise<any[]>} A Promise that resolves with an array of found records.
   */
  async findWhere(
    where: object,
    order: object = [["id", "DESC"]],
    queryOptions: object = {}
  ): Promise<any[]> {
    const record = await this.model.findAll({
      where: where,
      order: order,
      ...queryOptions,
    });
    return record;
  }

  /**
   * Bulk creates records.
   *
   * @param {object[]} data - The data for creating records.
   * @param {string[]} [updateOnDuplicateFields=[]] - Fields to update on duplicate key conflict.
   * @returns {Promise<object[]>} A Promise that resolves with an array of created records.
   */
  async bulkCreate(
    data: object,
    updateOnDuplicateFields: string[] = []
  ): Promise<object> {
    if (updateOnDuplicateFields.length > 0) {
      return await this.model.bulkCreate(data, {
        updateOnDuplicate: updateOnDuplicateFields,
      });
    }

    return await this.model.bulkCreate(data);
  }

  /**
   * Bulk deletes records.
   *
   * @param {object} where - The attributes or query parameters to search for.
   * @param {boolean} [force=false] - Set to true to hard delete.
   * @returns {Promise<any>} A Promise that resolves with the result of the deletion.
   */
  async bulkDelete(where: object, force: boolean = false): Promise<any> {
    return await this.model.destroy({
      where,
      force,
    });
  }

  /**
   * Counts the number of records in the repository that match the specified attributes.
   *
   * @param {object} where - The attributes or query parameters to search for.
   * @returns {Promise<number>} A Promise that resolves to the count of matching records.
   */
  async count(where: object): Promise<number> {
    return await this.model.count({ where: where });
  }
}
