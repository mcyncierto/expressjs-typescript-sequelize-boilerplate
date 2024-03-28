"use strict";
import { Model } from "sequelize";
import bcrypt from "bcrypt";

export default (
  sequelize: any,
  DataTypes: {
    STRING: any;
    DATE: any;
    UUID: any;
    UUIDV4: any;
    TEXT: any;
    BOOLEAN: any;
  }
) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      User.belongsToMany(models.Role, {
        as: "role",
        through: "UserRole",
      });

      User.hasOne(models.User, {
        as: "creator",
        foreignKey: "id",
        sourceKey: "createdBy",
        constraints: false,
      });

      User.hasOne(models.User, {
        as: "editor",
        foreignKey: "id",
        sourceKey: "lastUpdatedBy",
        constraints: false,
      });
    }
  }

  /**
   * Initialize the User model.
   */
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        field: "username",
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        field: "password",
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
        field: "full_name",
        allowNull: true,
      },
      isTemporaryPassword: {
        type: DataTypes.BOOLEAN,
        field: "is_temporary_password",
        defaultValue: true,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.UUID,
        field: "created_by",
      },
      lastUpdatedBy: {
        type: DataTypes.UUID,
        field: "last_updated_by",
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: true,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user: User) => {
    if (user.getDataValue("password")) {
      const saltRounds = 10;
      user.setDataValue(
        "password",
        await bcrypt.hash(user.getDataValue("password"), saltRounds)
      );
    }
  });

  User.beforeBulkCreate(async (users: any[]) => {
    const saltRounds = 10;
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
  });

  User.beforeBulkUpdate(async (options: any) => {
    if (options.attributes.password) {
      const saltRounds = 10;
      options.attributes.password = await bcrypt.hash(
        options.attributes.password,
        saltRounds
      );
    }
  });

  return User;
};
