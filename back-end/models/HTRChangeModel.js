const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class HistoryChangesComponents {
    constructor(changesComponentsID, changesComponentsTitle, dateOfChangeComponents, changesComponentsDes){
        this.changesComponentsID = changesComponentsID;
        this.changesComponentsTitle = changesComponentsTitle;
        this.dateOfChangeComponents = dateOfChangeComponents;
        this.changesComponentsDes = changesComponentsDes;
    }

    static async getAllChangesComponents() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM HistoryChangesComponents');
            const changesComponents = result.recordset.map(row => new HistoryChangesComponents(row.ChangesComponentsID, row.ChangesComponentsTitle, row.DateOfChangeComponents, row.ChangesComponentsDes));
            return changesComponents;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async getChangesComponentsByID(changesComponentsID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('changesComponentsID', mssql.Int, changesComponentsID)
                .query('SELECT * FROM HistoryChangesComponents WHERE ChangesComponentsID = @changesComponentsID');
                if (result.recordset.length > 0) {
                    const changesComponents = result.recordset[0];
                    return new HistoryChangesComponents(changesComponents.ChangesComponentsID, changesComponents.ChangesComponentsTitle, changesComponents.DateOfChangeComponents, changesComponents.ChangesComponentsDes);
                } else {
                    return null;
                }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    static async createChangesComponents(changesComponentsTitle, dateOfChangeComponents, changesComponentsDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('changesComponentsTitle', mssql.NVarChar, changesComponentsTitle)
                .input('dateOfChangeComponents', mssql.Date, dateOfChangeComponents)
                .input('changesComponentsDes', mssql.NVarChar, changesComponentsDes)
                .query('INSERT INTO HistoryChangesComponents(ChangesComponentsTitle, DateOfChangeComponents, ChangesComponentsDes) OUTPUT INSERTED.* VALUES (@changesComponentsTitle, @dateOfChangeComponents, @changesComponentsDes)');
            const changesComponents = result.recordset[0];
            return new HistoryChangesComponents(changesComponents.ChangesComponentsID, changesComponents.ChangesComponentsTitle, changesComponents.DateOfChangeComponents, changesComponents.ChangesComponentsDes);
        } catch (error) {
            console.error('Error creating HistoryChangesComponents:', error.message);
            console.error(error.stack);
            return null;
        }  
    }

    static async updateChangesComponents(changesComponentsID, changesComponentsTitle, dateOfChangeComponents, changesComponentsDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('changesComponentsID', mssql.Int, changesComponentsID)
                .input('changesComponentsTitle', mssql.NVarChar, changesComponentsTitle)
                .input('dateOfChangeComponents', mssql.Date, dateOfChangeComponents)
                .input('changesComponentsDes', mssql.NVarChar, changesComponentsDes)
                .query('UPDATE HistoryChangesComponents SET ChangesComponentsTitle = @changesComponentsTitle, DateOfChangeComponents = @dateOfChangeComponents, ChangesComponentsDes = @changesComponentsDes OUTPUT INSERTED.* WHERE ChangesComponentsID = @changesComponentsID');
            if (result.recordset.length > 0) {
                const changesComponents = result.recordset[0];
                return new HistoryChangesComponents(changesComponents.ChangesComponentsID, changesComponents.ChangesComponentsTitle, changesComponents.DateOfChangeComponents, changesComponents.ChangesComponentsDes);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteChangesComponents(changesComponentsID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('changesComponentsID', mssql.Int, changesComponentsID)
                .query('DELETE FROM HistoryChangesComponents OUTPUT DELETED.* WHERE ChangesComponentsID = @changesComponentsID');
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

module.exports = HistoryChangesComponents;
