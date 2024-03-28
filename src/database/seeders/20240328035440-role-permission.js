const { Op } = require("sequelize");
const { randUuid } = require("@ngneat/falso");

const tableName = "role_permissions";
const timestamps = { created_at: new Date(), updated_at: new Date() };
const rolePermissions = [
  {
    id: randUuid(),
    created_by: null,
    ...timestamps,
  },
];

async function up(queryInterface) {
  const { adminUser, adminRole, adminPermission } =
    await getAdminUserRolePermission(queryInterface);

  // Loop through the data and perform upsert for each record
  for (const record of rolePermissions) {
    record.role_id = adminRole.id;
    record.permission_id = adminPermission.id;
    record.created_by = adminUser.id;
    const { id, created_at, ...updateValues } = record; // Separate values for insert and update

    // Try to update the existing record; if not updated, insert a new record
    const rowCount = await queryInterface.bulkUpdate(tableName, updateValues, {
      role_id: adminRole.id,
      permission_id: adminPermission.id,
    });

    if (rowCount === 0) {
      await queryInterface.bulkInsert(tableName, [{ ...record }]);
    }
  }
}

async function down(queryInterface) {
  const { adminUser, adminRole, adminPermission } =
    await getAdminUserRolePermission(queryInterface);

  await queryInterface.bulkDelete(tableName, {
    role_id: adminRole.id,
    permission_id: adminPermission.id,
  });
}

/**
 * Get Super Admin user, role and permission data.
 *
 * @param {any} queryInterface
 * @returns {object}
 */
async function getAdminUserRolePermission(queryInterface) {
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

  // Get all access permission ID in permissions table for permission_id
  const permission = await queryInterface.sequelize.query(
    "SELECT * FROM permissions WHERE name = ? LIMIT 1",
    {
      replacements: ["all.all:any"],
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );

  return {
    adminUser: user.shift(),
    adminRole: role.shift(),
    adminPermission: permission.shift(),
  };
}

module.exports = { up, down };
