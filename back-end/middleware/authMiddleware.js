// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Thay 'your_secret_key' bằng một khóa bí mật thực sự
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = authMiddleware;