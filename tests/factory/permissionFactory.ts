import { factory } from "factory-girl";
import { randUuid, randTextRange } from "@ngneat/falso";
import models from "../../src/database/models";

const { Permission } = models;

const permissionProperties = {
  resource: randTextRange({ min: 1, max: 10 }),
  action: randTextRange({ min: 1, max: 10 }),
  name: randTextRange({ min: 1, max: 10 }),
  description: randTextRange({ min: 1, max: 2000 }),
  createdBy: randUuid(),
};

factory.define("permission", Permission, permissionProperties);

const createPermission = (attributes: object = {}): any =>
  factory.create("permission", { ...permissionProperties, ...attributes });

export default createPermission;
