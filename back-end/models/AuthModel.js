    const sql = require('mssql');
const bcrypt = require('bcrypt');
const config = require('../config/database');

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

class Account {
    constructor(accountID, accountName, accountPass, accountRole) {
        this.accountID = accountID;
        this.accountName = accountName;
        this.accountPass = accountPass;
        this.accountRole = accountRole;
    }

    static async createAccount(accountName, accountPass, accountRole) {
        await poolConnect;
        try {
            const hashedPassword = await bcrypt.hash(accountPass, 10);
            const request = pool.request();
            const result = await request
                .input('accountName', sql.NVarChar, accountName)
                .input('accountPass', sql.VarChar, hashedPassword)
                .input('accountRole', sql.VarChar, accountRole)
                .query('INSERT INTO Accounts (accountName, accountPass, accountRole) OUTPUT INSERTED.* VALUES (@accountName, @accountPass, @accountRole)');
            const account = result.recordset[0];
            return new Account(account.accountID, account.accountName, account.accountPass, account.accountRole);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async changePassword(accountID, newPassword) {
        await poolConnect;
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const request = pool.request();
            const result = await request
                .input('accountID', sql.Int, accountID)
                .input('accountPass', sql.VarChar, hashedPassword)
                .query('UPDATE Accounts SET accountPass = @accountPass WHERE accountID = @accountID');
            return result.recordset.length > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async verifyPassword(accountName, password) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('accountName', sql.NVarChar, accountName)
                .query('SELECT accountID, accountPass, accountRole FROM Accounts WHERE accountName = @accountName');
            
            if (result.recordset.length === 0) {
                throw new Error('Account not found');
            }

            const account = result.recordset[0];
            const isMatch = await bcrypt.compare(password, account.accountPass);
            if (isMatch) {
                return new Account(account.accountID, account.accountName, account.accountPass, account.accountRole);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async findByCredentials(accountName, accountPass) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('accountName', sql.NVarChar, accountName)
                .query('SELECT accountID, accountPass, accountRole FROM Accounts WHERE accountName = @accountName');
            
            if (result.recordset.length === 0) {
                throw new Error('Account not found');
            }

            const account = result.recordset[0];
            const isMatch = await bcrypt.compare(accountPass, account.accountPass);
            if (isMatch) {
                return new Account(account.accountID, account.accountName, account.accountPass, account.accountRole);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async changePassword(accountID, newPassword) {
        await poolConnect;
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const request = pool.request();
            const result = await request
                .input('accountID', sql.Int, accountID)
                .input('accountPass', sql.VarChar, hashedPassword)
                .query('UPDATE Accounts SET accountPass = @accountPass WHERE accountID = @accountID');
            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    static async getAccountById(accountID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('accountID', sql.Int, accountID)
                .query('SELECT accountID, accountName, accountPass, accountRole FROM Accounts WHERE accountID = @accountID');
            if (result.recordset.length === 0) {
                throw new Error('Account not found');
            }
            const account = result.recordset[0];
            return new Account(account.accountID, account.accountName, account.accountPass, account.accountRole);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = Account;
