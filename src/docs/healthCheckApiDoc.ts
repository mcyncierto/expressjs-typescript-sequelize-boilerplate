/**
 * @swagger
 * tags:
 *  name: Healthcheck
 *  description: Healthcheck API endpoints
 */

/**
 * @swagger
 * /api/healthcheck/app:
 *   get:
 *     summary: Get API application status
 *     tags: [Healthcheck]
 *     responses:
 *       200:
 *         description: Returns current state of API
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 appStatus: "ok"
 */

/**
 * @swagger
 * /api/healthcheck/db:
 *   get:
 *     summary: Get database status
 *     tags: [Healthcheck]
 *     responses:
 *       200:
 *         description: Returns current state of database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 dbStatus: "ok"
 */
