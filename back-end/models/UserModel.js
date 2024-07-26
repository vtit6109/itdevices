const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class User {
    constructor(id, userName, userEmail, deptID) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.deptID = deptID;
    }

    static async getAllUsers() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM Users');
            const users = result.recordset.map(row => new User(row.UserID, row.UserName, row.UserEmail, row.DeptID));
            return users;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getUserById(id) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .query('SELECT * FROM Users WHERE UserID = @id');
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                return new User(user.UserID, user.UserName, user.UserEmail, user.DeptID);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createUser(userName, userEmail, deptID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('userName', mssql.NVarChar, userName)
                .input('userEmail', mssql.NVarChar, userEmail) 
                .input('deptID', mssql.Int, deptID)
                .query('INSERT INTO Users (UserName, UserEmail, DeptID) OUTPUT INSERTED.* VALUES (@userName, @userEmail, @deptID)');
            const user = result.recordset[0];
            return new User(user.UserID, user.UserName, user.UserEmail, user.DeptID);
        } catch (error) {
            console.error('Error creating user:', error.message);
            console.error(error.stack);
            return null;
        }  
    }
    

    static async updateUser(id, userName, userEmail, deptID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .input('userName', mssql.NVarChar, userName)
                .input('userEmail', mssql.NVarChar, userEmail)
                .input('deptID', mssql.Int, deptID)
                .query('UPDATE Users SET UserName = @userName, UserEmail = @userEmail, DeptID = @deptID OUTPUT INSERTED.* WHERE UserID = @id');
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                return new User(user.UserID, user.UserName, user.UserEmail, user.DeptID);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteUser(id) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .query('DELETE FROM Users OUTPUT DELETED.* WHERE UserID = @id');
            if (result.recordset.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

module.exports = User;
