"use strict";
import { Model } from "sequelize";

export default (
  sequelize: any,
  DataTypes: { STRING: any; DATE: any; UUID: any; UUIDV4: any; TEXT: any }
) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {}
  }

  /**
   * Initialize the Post model.
   */
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        field: "title",
      },
      content: {
        type: DataTypes.TEXT("long"),
        field: "content",
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
      modelName: "Post",
    }
  );

  return Post;
};
