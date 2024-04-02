import request from "supertest";
import {
  createPermission,
  createRole,
  createRolePermission,
  createUser,
  createUserRole,
} from "../../factory";
import { UnauthorizedException } from "../../../src/exceptions/unauthorizedException";
import { AuthType } from "../types/authType";

/**
 * Logs in a user by sending a POST request to the authentication endpoint.
 *
 * @param {any} app - The Server app instance.
 * @param {object} userAttributes - Contains the values, attributes or credentials. If this is empty, the default values will be used.
 * @param {object} role - Contains the role to be assigned to the created user.
 * @param {string[]} permissions - Contains the permissions to be assigned to the created role.
 * @returns {Promise<AuthType>} A Promise that resolves to an authentication token and user data upon successful login.
 *
 * @throws {UnauthorizedException} Throws an UnauthorizedException if login fails.
 */
export async function login(
  app: any,
  userAttributes: object = {},
  role: object = {},
  permissions: string[] = []
): Promise<AuthType> {
  const defaultAttributes = {
    username: "TESTER",
    password: "P@ssw0rd",
  };

  const attributes = {
    ...defaultAttributes,
    ...userAttributes,
  };
  // Create user
  const authUser = await createUser(attributes);

  // Create and associate role to user
  let createdRole: any;

  if (Object.keys(role).length > 0) {
    createdRole = await createRole({ createdBy: authUser.id, ...role });
    await createUserRole({ userId: authUser.id, roleId: createdRole.id });
  }

  // Creeate and associate permissions to role
  if (permissions.length > 0) {
    for (const permission of permissions) {
      const createdPermission = await createPermission({ name: permission });
      await createRolePermission({
        roleId: createdRole.id,
        permissionId: createdPermission.id,
      });
    }
  }

  // Perform the login here and obtain the authentication token
  const response = await request(app).post("/api/v1/auth/login").send({
    username: attributes.username,
    password: attributes.password,
  });

  // Check if login was successful and return the token
  if (response.status === 200) {
    return {
      user: authUser,
      token: response.body.token,
      role: createdRole,
    };
  } else {
    throw new UnauthorizedException("Invalid username or password");
  }
}
