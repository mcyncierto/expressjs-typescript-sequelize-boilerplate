import { factory } from "factory-girl";
import { randUuid, randTextRange } from "@ngneat/falso";
import models from "../../../src/database/models";

const { UserRole } = models;

const userRoleProperties = {
  userId: randUuid(),
  roleId: randUuid(),
  createdBy: randUuid(),
};

factory.define("userRole", UserRole, userRoleProperties);

const createUserRole = (attributes: object = {}): any =>
  factory.create("userRole", {
    ...userRoleProperties,
    ...attributes,
  });

export default createUserRole;
