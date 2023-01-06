const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/waste');
const auth = require('../middlewares/auth');

router.get('/', [auth], wasteController.getAll);
router.get('/:id', [auth], wasteController.getOne);
router.post('/', [auth], wasteController.create);
router.put('/:id', [auth], wasteController.update);
router.delete('/:id', [auth], wasteController.delete);

module.exports = router;
