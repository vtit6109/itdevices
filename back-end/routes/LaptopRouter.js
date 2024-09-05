const express = require('express');
const router = express.Router();
const laptopController = require('../controllers/LaptopController');
const { authMiddleware, adminMiddleware, userMiddleware } = require('../middleware/authMiddleware');

// Áp dụng authMiddleware cho tất cả các route
router.use(authMiddleware);

// Lấy tất cả laptops (chỉ admin và user)
router.get('/', userMiddleware, laptopController.getAllLaptops);

// Lấy laptop theo ID (chỉ admin và user)
router.get('/:id', userMiddleware, laptopController.getLaptopById);

// Tạo mới laptop (chỉ admin)
router.post('/', adminMiddleware, laptopController.createLaptop);

// Cập nhật laptop (chỉ admin)
router.put('/:id', adminMiddleware, laptopController.updateLaptop);

// Xóa laptop (chỉ admin)
router.delete('/:id', adminMiddleware, laptopController.deleteLaptop);

module.exports = router;