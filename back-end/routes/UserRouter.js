const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, adminMiddleware, userMiddleware } = require('../middleware/authMiddleware');

// Áp dụng authMiddleware cho tất cả các route
router.use(authMiddleware);

// Lấy tất cả người dùng (chỉ admin)
router.get('/', userMiddleware, userController.getAllUsers);

// Lấy người dùng theo ID (chỉ admin và user)
router.get('/:id', userMiddleware, userController.getUserById);

// Tạo mới người dùng (chỉ admin)
router.post('/', adminMiddleware, userController.createUser);

// Cập nhật người dùng (chỉ admin)
router.put('/:id', adminMiddleware, userController.updateUser);

// Xóa người dùng (chỉ admin)
router.delete('/:id', adminMiddleware, userController.deleteUser);

module.exports = router;