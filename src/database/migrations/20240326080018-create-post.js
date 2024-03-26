const { Sequelize } = require("sequelize");

async function up(queryInterface) {
  await queryInterface.createTable("posts", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
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
  await queryInterface.dropTable("posts");
}

module.exports = { up, down };
