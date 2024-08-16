
const express = require('express');
const router = express.Router();
const Login = require('../controllers/LoginController');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Login.authenticateAccount(username, password);
  
  if (user) {
    const token = jwt.sign({ user: { id: user.UserID, username: user.UserName } }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ' });
  }
});

module.exports = router;