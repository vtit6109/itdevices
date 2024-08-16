const express = require('express');
const controller = require('../controllers/PositionController') 
const router = express.Router();

// GET all 
router.get('/', controller.getAllPositions);

// GET  by ID
router.get('/:id', controller.getPositionByID);

// POST create new 
router.post('/', controller.createPosition);

// PUT update 
router.put('/:id', controller.updatePosition);

// DELETE delete 
router.delete('/:id', controller.deletePosition);

module.exports = router;
