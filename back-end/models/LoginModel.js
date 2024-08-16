// models/UserModel.js
const mssql = require('mssql');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Accounts {

  static async authenticateAccount(username, password) {
    await poolConnect;
    try {
      const request = pool.request();
      const result = await request
        .input('username', mssql.NVarChar, username)
        .query('SELECT * FROM Users WHERE UserName = @username');
      
      if (result.recordset.length > 0) {
        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.Password);
        if (isMatch) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

module.exports = Accounts;