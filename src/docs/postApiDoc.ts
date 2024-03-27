/**
 * @swagger
 * definition:
 *   Post:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         example: "0a49cfde-48f5-4fb6-b267-2a6ae123bff2"
 *       title:
 *         type: string
 *         example: "Lorem Ipsum"
 *       content:
 *         type: string
 *         example: "Lorem Ipsum Dolor"
 *     required:
 *       - title
 *       - content
 */

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post API endpoints
 */

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             example:
 *               title: "Title Lorem Ipsum"
 *               content: "Lorem Ipsum Dolor"
 *     responses:
 *       201:
 *         description: Returns the id of the created post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:
 *                 data:
 *                   id: "702d35b1-468a-4976-9afe-9d1c621d1d70"
 *       400:
 *         description: Invalid request body
 */
