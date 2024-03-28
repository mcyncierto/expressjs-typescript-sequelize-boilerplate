const { Op } = require("sequelize");
const { randUuid } = require("@ngneat/falso");
const bcrypt = require("bcrypt");
import process from "process";

const tableName = "users";
const timestamps = { created_at: new Date(), updated_at: new Date() };
const users = [
  {
    id: randUuid(),
    username: "super-admin",
    password: bcrypt.hashSync(process.env.INITIAL_SUPER_ADMIN_PASSWORD, 10),
    full_name: "Super Admin",
    is_temporary_password: false,
    ...timestamps,
  },
];

async function up(queryInterface) {
  // Loop through the data and perform upsert for each record
  for (const record of users) {
    const { id, username, created_at, ...updateValues } = record; // Separate values for insert and update

    // Try to update the existing record; if not updated, insert a new record
    const rowCount = await queryInterface.bulkUpdate(tableName, updateValues, {
      username: username,
    });

    if (rowCount === 0) {
      await queryInterface.bulkInsert(tableName, [{ ...record }]);
    }
  }
}

async function down(queryInterface) {
  const usernames = users.map((config) => config.username);

  await queryInterface.bulkDelete(tableName, {
    username: {
      [Op.in]: usernames,
    },
  });
}

module.exports = { up, down };
