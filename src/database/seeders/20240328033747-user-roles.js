const { Op } = require("sequelize");
const { randUuid } = require("@ngneat/falso");

const tableName = "user_roles";
const timestamps = { created_at: new Date(), updated_at: new Date() };
const userRoles = [
  {
    id: randUuid(),
    created_by: null,
    ...timestamps,
  },
];

async function up(queryInterface) {
  const { adminUser, adminRole } = await getInitialUserAndRole(queryInterface);

  // Loop through the data and perform upsert for each record
  for (const record of userRoles) {
    record.user_id = adminUser.id;
    record.role_id = adminRole.id;
    record.created_by = adminUser.id;
    const { id, created_at, ...updateValues } = record; // Separate values for insert and update

    // Try to update the existing record; if not updated, insert a new record
    const rowCount = await queryInterface.bulkUpdate(tableName, updateValues, {
      user_id: adminUser.id,
      role_id: adminRole.id,
    });

    if (rowCount === 0) {
      await queryInterface.bulkInsert(tableName, [{ ...record }]);
    }
  }
}

async function down(queryInterface) {
  const { adminUser, adminRole } = await getInitialUserAndRole(queryInterface);

  await queryInterface.bulkDelete(tableName, {
    user_id: adminUser.id,
    role_id: adminRole.id,
  });
}

/**
 * Get initial user and role data.
 *
 * @param {any} queryInterface
 * @returns {object}
 */
async function getInitialUserAndRole(queryInterface) {
  // Get Super Admin User ID in users table for user_id and created_by
  const user = await queryInterface.sequelize.query(
    "SELECT * FROM users WHERE username = ? LIMIT 1",
    {
      replacements: ["super-admin"],
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );

  // Get Super Admin Role ID in users table for role_id
  const role = await queryInterface.sequelize.query(
    "SELECT * FROM roles WHERE name = ? LIMIT 1",
    {
      replacements: ["super-admin"],
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );

  return { adminUser: user.shift(), adminRole: role.shift() };
}

module.exports = { up, down };
