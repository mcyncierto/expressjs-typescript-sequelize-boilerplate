import { factory } from "factory-girl";
import { randUuid, randTextRange } from "@ngneat/falso";
import models from "../../src/database/models";

const { Role } = models;

const roleProperties = {
  name: randTextRange({ min: 1, max: 150 }),
  label: randTextRange({ min: 1, max: 150 }),
  description: randTextRange({ min: 1, max: 2000 }),
  createdBy: randUuid(),
};

factory.define("role", Role, roleProperties);

const createRole = (attributes: object = {}): any =>
  factory.create("role", { ...roleProperties, ...attributes });

export default createRole;
