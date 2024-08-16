const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class HistoryHandoverUser {
    constructor(handoverID, handoverDate, handoverTitle, handoverDes, userID) {
        this.handoverID = handoverID;
        this.handoverDate = handoverDate;
        this.handoverTitle = handoverTitle;
        this.handoverDes = handoverDes;
        this.userID = userID;
    }

    static async getAllHistoryHandoverUsers() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM HistoryHandoverUser');
            const historyHandoverUsers = result.recordset.map(row => new HistoryHandoverUser(row.HandoverID, row.HandoverDate, row.HandoverTitle, row.HandoverDes, row.UserID));
            return historyHandoverUsers;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getHistoryHandoverUserById(id) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .query('SELECT * FROM HistoryHandoverUser WHERE HandoverID = @id');
            if (result.recordset.length > 0) {
                const historyHandoverUser = result.recordset[0];
                return new HistoryHandoverUser(historyHandoverUser.HandoverID, historyHandoverUser.HandoverDate, historyHandoverUser.HandoverTitle, historyHandoverUser.HandoverDes, historyHandoverUser.UserID);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createHistoryHandoverUser(handoverDate, handoverTitle, handoverDes, userID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('handoverDate', mssql.Date, handoverDate)
                .input('handoverTitle', mssql.NVarChar, handoverTitle)
                .input('handoverDes', mssql.NVarChar, handoverDes)
                .input('userID', mssql.Int, userID)
                .query('INSERT INTO HistoryHandoverUser (HandoverDate, HandoverTitle, HandoverDes, UserID) OUTPUT INSERTED.* VALUES (@handoverDate, @handoverTitle, @handoverDes, @userID)');
            const historyHandoverUser = result.recordset[0];
            return new HistoryHandoverUser(historyHandoverUser.HandoverID, historyHandoverUser.HandoverDate, historyHandoverUser.HandoverTitle, historyHandoverUser.HandoverDes, historyHandoverUser.UserID);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateHistoryHandoverUser(handoverID, handoverDate, handoverTitle, handoverDes, userID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('handoverID', mssql.Int, handoverID)
                .input('handoverDate', mssql.Date, handoverDate)
                .input('handoverTitle', mssql.NVarChar, handoverTitle)
                .input('handoverDes', mssql.NVarChar, handoverDes)
                .input('userID', mssql.Int, userID)
                .query('UPDATE HistoryHandoverUser SET HandoverDate = @handoverDate, HandoverTitle = @handoverTitle, HandoverDes = @handoverDes, UserID = @userID WHERE HandoverID = @handoverID; SELECT * FROM HistoryHandoverUser WHERE HandoverID = @handoverID');
            const historyHandoverUser = result.recordset[0];
            return new HistoryHandoverUser(historyHandoverUser.HandoverID, historyHandoverUser.HandoverDate, historyHandoverUser.HandoverTitle, historyHandoverUser.HandoverDes, historyHandoverUser.UserID);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteHistoryHandoverUser(handoverID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('handoverID', mssql.Int, handoverID)
                .query('DELETE FROM HistoryHandoverUser OUTPUT DELETED.* WHERE HandoverID = @handoverID');
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

module.exports = HistoryHandoverUser;
