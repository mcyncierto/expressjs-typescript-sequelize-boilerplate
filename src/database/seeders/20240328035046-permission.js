const { Op } = require("sequelize");
const { randUuid } = require("@ngneat/falso");
const fs = require("fs");
const path = require("path");

const tableName = "permissions";
const timestamps = { created_at: new Date(), updated_at: new Date() };
const permissionsFilePath = path.join(__dirname, "../data", "permissions.json");
const permissions = JSON.parse(fs.readFileSync(permissionsFilePath, "utf8"));

async function up(queryInterface) {
  // Get Super Admin User ID in users table for created_by
  const user = await queryInterface.sequelize.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    {
      replacements: ["super-admin"],
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );
  const adminUser = user.shift();

  // Loop through the data and perform upsert for each record
  for (const record of permissions) {
    record.id = randUuid();
    record.created_by = adminUser.id;
    record.created_at = timestamps.created_at;
    record.updated_at = timestamps.updated_at;

    const { id, name, created_at, ...updateValues } = record; // Separate values for insert and update

    // Try to update the existing record; if not updated, insert a new record
    const rowCount = await queryInterface.bulkUpdate(tableName, updateValues, {
      name: name,
    });

    if (rowCount === 0) {
      await queryInterface.bulkInsert(tableName, [{ ...record }]);
    }
  }
}

async function down(queryInterface) {
  const names = permissions.map((config) => config.name);

  await queryInterface.bulkDelete(tableName, {
    name: {
      [Op.in]: names,
    },
  });
}

module.exports = { up, down };
