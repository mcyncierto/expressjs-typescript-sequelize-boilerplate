/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth API endpoints
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with username and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             example:
 *               username: "TESTUSER"
 *               password: "test-password"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 issuedAt: "1696214757"
 *                 expiresAt: "1696257957"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3ZjQ3N2I2LWI4NDUtNDVjYi1hOWFhLWMwZmQxOTIxYTEyNiIsInVzZXJuYW1lIjoiQURNU1UiLCJlbXBsb3llZUlkIjpudWxsLCJmdWxsTmFtZSI6IlN1cGVyIEFkbWluIiwibTFXb3JrQ2VudGVyIjpudWxsLCJtMURlcGFydG1lbnQiOm51bGwsIm0xQ29udGFjdFRpdGxlIjpudWxsLCJpc00xVXNlciI6ZmFsc2UsImlzVGVtcG9yYXJ5UGFzc3dvcmQiOmZhbHNlLCJjcmVhdGVkQnkiOm51bGwsImxhc3RVcGRhdGVkQnkiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDktMjlUMDM6MDU6MjMuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDktMjlUMDU6NTY6NTcuMDAwWiIsImRlbGV0ZWRBdCI6bnVsbCwiaWF0IjoxNjk2MjE0NzU3LCJleHAiOjE2OTYyNTc5NTd9.sgxyYJ1IRVIH7ZDFvOB7oCSViFD9ERj7bJqGFRERK7E"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 status: 401
 *                 message: "Invalid username or password"
 */
