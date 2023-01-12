const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/waste');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Waste:
 *       type: object
 *       required:
 *         - label
 *         - issuing_company
 *         - quantity
 *         - expiration_date
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated ID of the waste
 *         label:
 *           type: string
 *           description: The label of the request.
 *         issuing_company:
 *           type: string
 *           description: Name of the issuing company.
 *         quantity:
 *           type: number,
 *           description: Quantity of waste.
 *         expiration_date:
 *           type: string
 *           description: expiry date
 *         is_collected:
 *           type: boolean
 *           description: Weither the waste was collected or not
 *       example:
 *          label: "Patates"
 *          issuing_company: "Leclerc"
 *          quantity: 25
 *          expiration_date: "2023-01-11"
 *          is_collected: false
 */

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:        
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT  
 */

/**
 * @swagger
 * tags:
 *  name: Waste
 *  description: API to manage wastes.
 */

/**
 * @swagger
 * path:
 * /api/wastes:
 *   get:
 *    security:
 *      - bearerAuth: []
 *    summary: List all wastes
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *    responses:
 *      "200":
 *        description: Returns a list of wastes.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 *      "404":
 *        description: Not found
 */
router.get('/', [auth], wasteController.getAll);

/**
 * @swagger
 * path:
 * /api/wastes/{id}:
 *   get:
 *    security:
 *      - bearerAuth: []
 *    summary: Return a single waste record
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the waste to get
 *    responses:
 *      "200":
 *        description: Returns a single waste record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
router.get('/:id', [auth], wasteController.getOne);

/**
 * @swagger
 * path:
 * /api/wastes:
 *   post:
 *    security:
 *      - bearerAuth: []
 *    summary: Creates a new waste record
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Waste'
 *    responses:
 *      "200":
 *        description: Returns the created waste record.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
router.post('/', [auth], wasteController.create);

/**
 * @swagger
 * put:
 * /api/wastes/{id}:
 *   put:
 *    security:
 *      - bearerAuth: []
 *    summary: Updates an existing waste record
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the waste to get
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Waste'
 *    responses:
 *      "200":
 *        description: Returns the updated waste.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
router.put('/:id', [auth], wasteController.update);

/**
 * @swagger
 * path:
 * /api/wastes/{id}:
 *   delete:
 *    security:
 *      - bearerAuth: []
 *    summary: Delete an existing waste record
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the waste to get
 *    responses:
 *      "200":
 *        description: The waste has been deleted
 */
router.delete('/:id', [auth], wasteController.delete);

/**
 * @swagger
 * path:
 * /api/wastes/find:
 *   post:
 *    security:
 *      - bearerAuth: []
 *    summary: Find a waste
 *    tags: [Waste]
 *    parameters:
 *      - in: header
 *        name: username
 *        required: true
 *        description: username of user to check token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Waste'
 *    responses:
 *      "200":
 *        description: Returns the waste find.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Waste'
 */
router.post('/find', [auth], wasteController.filter);

module.exports = router;
