const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("user_roles", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
      constraints: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    role_id: {
      type: Sequelize.UUID,
      allowNull: false,
      constraints: false,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    created_by: {
      type: Sequelize.STRING,
    },
    last_updated_by: {
      type: Sequelize.STRING,
    },
    deleted_at: {
      type: Sequelize.DATE,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable("user_roles");
}

module.exports = { up, down };
