const express = require('express');
const router = express.Router();
const wasteController = require('../api/controllers/waste');

router.get('/', wasteController.getAll);
router.get('/:id', wasteController.getOne);
router.post('/', wasteController.create);
router.put('/:id', wasteController.update);
router.delete('/:id', wasteController.delete);

module.exports = router;
