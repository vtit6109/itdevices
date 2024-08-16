const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Users {
    constructor(id, userName, userEmail, deptID, postID, deptName, postName) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.deptID = deptID;
        this.postID = postID;
        this.deptName = deptName;
        this.postName = postName;
    }
    

    static async getAllUsers() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT Users.*, Departments.DeptName, Positions.PostName FROM Users LEFT JOIN Departments ON Users.DeptID = Departments.DeptID LEFT JOIN Positions ON Users.PostID = Positions.PostID');
            const users = result.recordset.map(row => new Users(row.UserID, row.UserName, row.UserEmail, row.DeptID, row.PostID, row.DeptName, row.PostName));
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
                .query('SELECT Users.*, Departments.DeptName, Positions.PostName FROM Users LEFT JOIN Departments ON Users.DeptID = Departments.DeptID LEFT JOIN Positions ON Users.PostID = Positions.PostID WHERE UserID = @id');
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                return new Users(user.UserID, user.UserName, user.UserEmail, user.DeptID, user.PostID, user.DeptName, user.PostName);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    static async createUser(userName, userEmail, deptID, postID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('userName', mssql.NVarChar, userName)
                .input('userEmail', mssql.NVarChar, userEmail)
                .input('deptID', mssql.Int, deptID)
                .input('postID', mssql.Int, postID)
                .query('INSERT INTO Users (UserName, UserEmail, DeptID, PostID) OUTPUT INSERTED.* VALUES (@userName, @userEmail, @deptID, @postID)');
            const user = result.recordset[0];
            return new Users(user.UserID, user.UserName, user.UserEmail, user.DeptID, user.PostID, user.DeptName, user.PostName);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    

    static async updateUser(id, userName, userEmail, deptID, postID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .input('userName', mssql.NVarChar, userName)
                .input('userEmail', mssql.Char, userEmail)
                .input('deptID', mssql.Int, deptID)
                .input('postID', mssql.Int, postID)
                .query('UPDATE Users SET UserName = @userName, UserEmail = @userEmail, DeptID = @deptID, PostID = @postID WHERE UserID = @id; SELECT Users.*, Departments.DeptName, Positions.PostName FROM Users LEFT JOIN Departments ON Users.DeptID = Departments.DeptID LEFT JOIN Positions ON Users.PostID = Positions.PostID WHERE UserID = @id');
            const user = result.recordset[0];
            return new Users(user.UserID, user.UserName, user.UserEmail, user.DeptID, user.PostID, user.DeptName, user.PostName);
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

module.exports = Users;
