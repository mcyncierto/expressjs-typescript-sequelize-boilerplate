"use strict";
import { Model } from "sequelize";

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
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      models.User.belongsToMany(models.Role, { through: "UserRole" });
      models.Role.belongsToMany(models.User, { through: "UserRole" });
    }
  }

  /**
   * Initialize the UserRole model.
   */
  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        field: "role_id",
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
      modelName: "UserRole",
    }
  );

  return UserRole;
};
