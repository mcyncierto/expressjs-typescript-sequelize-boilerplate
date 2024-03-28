import models from "../database/models";
import { UserRepository } from "../repositories/userRepository";
import { UnauthorizedException } from "../exceptions/unauthorizedException";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

const { User, Role, Permission } = models;
const userRepository = new UserRepository(User);

export class AuthService {
  /**
   * Authenticates a user by username and password.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @returns {Promise<UserType | void>} A promise that resolves to the retrieved user.
   *
   * @throws {UnauthorizedException} Thrown if username or password is invalid.
   */
  static async authenticate(
    username: string,
    password: string
  ): Promise<object> {
    const user = await userRepository.findOne(
      { username },
      {
        model: Role,
        as: "role",
        include: {
          model: Permission,
          as: "permissions",
          through: {
            attributes: [],
          },
        },
      }
    );

    const rawPassword = password;

    if (user) {
      // Extract role
      let roleDetails = {};
      if (user.role[0]) {
        roleDetails = {
          id: user.role[0].id,
          name: user.role[0].name,
          label: user.role[0].label,
        };
      }

      // Extract permissions
      let permissionDetails = [];
      if (user.role[0] && user.role[0].permissions) {
        permissionDetails = user.role[0].permissions.map(function (
          permission: any
        ) {
          return {
            id: permission.id,
            resource: permission.resource,
            action: permission.action,
            name: permission.name,
          };
        });
      }

      const match = await bcrypt.compare(rawPassword, user.password);

      if (!match) {
        throw new UnauthorizedException("Invalid username or password");
      }

      const { role, password, picture, ...userData } = user.dataValues;
      userData.role = roleDetails;
      userData.permissions = permissionDetails;

      const token = jwt.sign({ ...userData }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "12h", // token expires in 12 hours
      });

      let { iat, exp }: any = jwt.decode(token);

      return { issuedAt: iat, expiresAt: exp, token };
    } else {
      throw new UnauthorizedException("Invalid username or password");
    }
  }
}
