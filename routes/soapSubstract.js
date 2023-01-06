const express = require('express');
const router = express.Router();
const userController = require('../controllers/soapSubstract');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     SoapSubstract:
 *       type: object
 *       required:
 *         - number1
 *         - number2
 *       properties:
 *         number1:
 *           type: number
 *           description: The number to substract
 *         number2:
 *           type: number
 *           description: the number that reduce the number1
 *       example:
 *          number1: 7
 *          number2: 2
 */

/**
 * @swagger
 * tags:
 *  name: Soap
 *  description: API to use an another API SOAP
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
 * path:
 * /soap/substract:
 *   post:
 *    security:
 *      - bearerAuth: []
 *    summary: Use API SOAP to do a substract operation
 *    tags: [Soap]
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
 *            $ref: '#/components/schemas/SoapSubstract'
 *    responses:
 *      "200":
 *        description: Return substraction
 */
router.post('/substract', [auth], userController.substract);

module.exports = router;
