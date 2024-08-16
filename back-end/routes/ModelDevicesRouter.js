const express = require('express');
const controller = require('../controllers/ModelDevicesController');
const router = express.Router();

// GET all ModelDevices
router.get('/', controller.getAllModelDevices);

// GET ModelDevice by ID
router.get('/:id', controller.getModelDeviceById);

// POST create new ModelDevice
router.post('/', controller.createModelDevice);

// PUT update ModelDevice
router.put('/:id', controller.updateModelDevice);

// DELETE delete ModelDevice
router.delete('/:id', controller.deleteModelDevice);

module.exports = router;
