import { factory } from "factory-girl";
import { randPassword, randFullName, randAbbreviation } from "@ngneat/falso";
import models from "../../src/database/models";

const { User } = models;

const userProperties = {
  username: randAbbreviation(),
  password: randPassword(),
  fullName: randFullName(),
  isTemporaryPassword: false,
  createdBy: null,
  lastUpdatedBy: null,
  terminatedAt: null,
};

factory.define("user", User, userProperties);

const createUser = (attributes: object = {}): any =>
  factory.create("user", { ...userProperties, ...attributes });

export default createUser;
