const jwt = require('jsonwebtoken');
const sql = require('mssql');
const config = require('../config/database');

require('dotenv').config();

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    req.user = { role: 'guest' };
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded.user;

    await poolConnect;
    const request = pool.request();
    const result = await request
      .input('accountID', sql.Int, req.user.accountID)
      .query('SELECT accountRole FROM Accounts WHERE accountID = @accountID');

    if (result.recordset.length === 0) {
      req.user.role = 'guest';
    } else {
      req.user.role = result.recordset[0].accountRole;
    }

    next();
  } catch (error) {
    req.user = { role: 'guest' };
    next();
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
  }
  next();
};

const userMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'user') {
    return res.status(403).json({ message: 'Quyền truy cập bị từ chối' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware, userMiddleware };