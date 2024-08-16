const express = require('express');
const controller = require('../controllers/HTRChangeController'); 
const router = express.Router();

// GET all 
router.get('/', controller.getAllChangesComponents);

// GET  by ID
router.get('/:id', controller.getChangesComponentsById);

// POST create new 
router.post('/', controller.createChangesComponents);

// PUT update 
router.put('/:id', controller.updateChangesComponents);

// DELETE delete 
router.delete('/:id', controller.deleteChangesComponents);

module.exports = router;
