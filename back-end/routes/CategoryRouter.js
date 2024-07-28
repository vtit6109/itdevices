const express = require('express');
const controller = require('../controllers/CategoryController'); 
const router = express.Router();

// GET all 
router.get('/', controller.getAllCategory);

// GET  by ID
router.get('/:id', controller.getCategoryById);

// POST create new 
router.post('/', controller.createCategory);

// PUT update 
router.put('/:id', controller.updateCategory);

// DELETE delete 
router.delete('/:id', controller.deleteCategory);

module.exports = router;