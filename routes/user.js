const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       example:
 *          username: "johndoe"
 *          password: "123456"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - confirmPassword
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The username of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         confirmPassword:
 *           type: string
 *           description: The password of the user.
 *       example:
 *          username: "johndoe"
 *          password: "123456"
 *          confirmPassword: "123456"
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: API to manage users.
 */

/**
 * @swagger
 * path:
 * /api/auth/signup:
 *   post:
 *    summary: Creates a new user record
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignup'
 *    responses:
 *      "200":
 *        description: Returns the created user record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "400":
 *        description: Bad request.
 */
router.post('/signup', userController.createUser);

/**
 * @swagger
 * path:
 * /api/auth/login:
 *   post:
 *    summary: Log user in by providing a token
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      "200":
 *        description: Returns a token with the user id.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      "400":
 *        description: Not Found.
 */
router.post('/login', userController.login);

/**
 * @swagger
 * path:
 * /api/auth/logout:
 *   post:
 *    summary: Log user in by providing a token
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      "200":
 *        description: user deleted.
 */
router.post('/logout', userController.logout);

module.exports = router;
