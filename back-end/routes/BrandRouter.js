const express = require('express');
const controller = require('../controllers/BrandController'); 
const router = express.Router();

//Get all
router.get('/', controller.getAllBrand);

// GET  by ID
router.get('/:id', controller.getBrandById);

// POST create new 
router.post('/', controller.createBrand);

// PUT update 
router.put('/:id', controller.updateBrand);

// DELETE delete 
router.delete('/:id', controller.deleteBrand);

module.exports = router;