const express = require('express');
const controller = require('../controllers/DeptController'); 
const router = express.Router();

// GET all 
router.get('/', controller.getAllDepts);

// GET  by ID
router.get('/:id', controller.getDeptById);

// POST create new 
router.post('/', controller.createDept);

// PUT update 
router.put('/:id', controller.updateDept);

// DELETE delete 
router.delete('/:id', controller.deleteDept);

module.exports = router;
