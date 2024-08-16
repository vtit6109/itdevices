const express = require('express');
const controller = require('../controllers/HandoverController'); 
const router = express.Router();

// GET all 
router.get('/', controller.getAllHistoryHandoverUsers);

// GET  by ID
router.get('/:id', controller.getHistoryHandoverUserById);

// POST create new 
router.post('/', controller.createHistoryHandoverUser);

// PUT update 
router.put('/:id', controller.updateHistoryHandoverUser);

// DELETE delete 
router.delete('/:id', controller.deleteHistoryHandoverUser);

module.exports = router;
