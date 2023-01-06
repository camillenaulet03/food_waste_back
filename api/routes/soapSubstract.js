const express = require('express');
const router = express.Router();
const userController = require('../../controllers/soapSubstract');
const auth = require('../../middlewares/auth');

router.post('/substract', [auth], userController.substract);

module.exports = router;
