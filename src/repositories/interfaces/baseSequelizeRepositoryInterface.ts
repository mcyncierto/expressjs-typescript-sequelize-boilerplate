export interface BaseSequelizeRepositoryInterface {
  getAll(
    where: object,
    order: object,
    include?: [],
    attributes?: {},
    raw?: boolean,
    limit?: number | null
  ): Promise<any>;
  findById(id: string): Promise<any | null>;
  create(data: any, trans?: {}): Promise<object>;
  update(id: string, data: object, include?: []): Promise<object>;
  delete(id: string): Promise<void>;
  findOne(where: object, include?: [], attributes?: {}): Promise<object>;
  paginate(
    where: object,
    page: number,
    pageSize: number,
    include: object,
    order: object,
    attributes: any,
    raw?: boolean
  ): Promise<any>;
  findWhere(where: object, order: object, queryOptions?: {}): Promise<any[]>;
  bulkCreate(data: object, updateOnDuplicateFields?: string[]): Promise<object>;
  bulkDelete(attributes: object, force: boolean): Promise<any>;
  count(where: object): Promise<number>;
}
