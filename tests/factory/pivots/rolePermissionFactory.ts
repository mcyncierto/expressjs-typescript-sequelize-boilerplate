import { factory } from "factory-girl";
import { randUuid, randTextRange } from "@ngneat/falso";
import models from "../../../src/database/models";

const { RolePermission } = models;

const rolePermissionProperties = {
  roleId: randUuid(),
  permissionId: randUuid(),
  createdBy: randUuid(),
};

factory.define("rolePermission", RolePermission, rolePermissionProperties);

const createRolePermission = (attributes: object = {}): any =>
  factory.create("rolePermission", {
    ...rolePermissionProperties,
    ...attributes,
  });

export default createRolePermission;
