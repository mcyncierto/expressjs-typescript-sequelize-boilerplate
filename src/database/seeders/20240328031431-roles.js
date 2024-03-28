const { Op } = require("sequelize");
const { randUuid } = require("@ngneat/falso");

const tableName = "roles";
const timestamps = { created_at: new Date(), updated_at: new Date() };
const roles = [
  {
    id: randUuid(),
    name: "super-admin",
    label: "Super Administrator",
    description:
      "Has full and unrestricted access to all permissions and functionalities within the whole application.",
    created_by: null,
    ...timestamps,
  },
  {
    id: randUuid(),
    name: "basic-access",
    label: "Basic Access User",
    description: "Has limited permissions within the whole application.",
    created_by: null,
    ...timestamps,
  },
];

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
  for (const record of roles) {
    record.created_by = adminUser.id;
    const { id, name, label, description, created_at, ...updateValues } =
      record; // Separate values for insert and update

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
  const names = roles.map((config) => config.name);

  await queryInterface.bulkDelete(tableName, {
    name: {
      [Op.in]: names,
    },
  });
}

module.exports = { up, down };
