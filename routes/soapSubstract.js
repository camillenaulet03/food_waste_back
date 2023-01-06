const express = require('express');
const router = express.Router();
const userController = require('../controllers/soapSubstract');

router.post('/substract', userController.substract);

module.exports = router;
