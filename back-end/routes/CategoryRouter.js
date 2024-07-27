const express = require('express');
const controller = require('../controllers/CategoryController'); 
const router = express.Router();

// GET all 
router.get('/', controller.getAllCategory);

module.exports = router;