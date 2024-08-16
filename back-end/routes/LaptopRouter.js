const express = require('express');
const controller = require('../controllers/LaptopController') 
const router = express.Router();

// GET all 
router.get('/', controller.getAllLaptopInfos);

// GET  by ID
router.get('/:id', controller.getLaptopInfoById);

// POST create new 
router.post('/', controller.createLaptopInfo);

// PUT update 
router.put('/:id', controller.updateLaptopInfo);

// DELETE delete 
router.delete('/:id', controller.deleteLaptopInfo);

module.exports = router;
