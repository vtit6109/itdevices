const express = require('express');
const controller = require('../controllers/StateController');
const router = express.Router();

// GET all state usings
router.get('/', controller.getAllStateUsings);

// GET state using by ID
router.get('/:id', controller.getStateUsingById);

// POST create new state using
router.post('/', controller.createStateUsing);

// PUT update state using
router.put('/:id', controller.updateStateUsing);

// DELETE delete state using
router.delete('/:id', controller.deleteStateUsing);

module.exports = router;