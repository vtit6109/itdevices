const express = require('express');
const controller = require('../controllers/UserController'); // Đảm bảo tên file đúng là userController.js
const router = express.Router();

// GET all users
router.get('/', controller.getAllUsers);

// GET user by ID
router.get('/:id', controller.getUserById);

// POST create new user
router.post('/', controller.createUser);

// PUT update user
router.put('/:id', controller.updateUser);

// DELETE delete user
router.delete('/:id', controller.deleteUser);

module.exports = router;
