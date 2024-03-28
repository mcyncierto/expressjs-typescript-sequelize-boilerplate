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
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Permission.hasOne(models.User, {
        as: "creator",
        foreignKey: "id",
        sourceKey: "createdBy",
        constraints: false,
      });
    }
  }

  /**
   * Initialize the Permission model.
   */
  Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      resource: {
        type: DataTypes.STRING,
        field: "resource",
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        field: "action",
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        field: "name",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        field: "description",
        allowNull: true,
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
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      paranoid: false,
      modelName: "Permission",
    }
  );

  return Permission;
};
