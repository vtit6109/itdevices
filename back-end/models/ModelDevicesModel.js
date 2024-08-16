const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class ModelDevices {
    constructor(modelID, modelName, modelDes, categoryID, categoryName) {
        this.modelID = modelID;
        this.modelName = modelName;
        this.modelDes = modelDes;
        this.categoryID = categoryID;  
        this.categoryName = categoryName;
    }
    

    static async getAllModels() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT ModelDevices.*, Categories.CategoryName from ModelDevices  LEFT JOIN Categories ON ModelDevices.CategoryID = Categories.CategoryID');
            const models = result.recordset.map(row => new ModelDevices(row.ModelID, row.ModelName, row.ModelDes, row.CategoryID, row.CategoryName));
            return models;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
   
    static async getModelById(modelID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('modelID', mssql.Int, modelID)
                .query('SELECT ModelDevices.*, Categories.CategoryName from ModelDevices  LEFT JOIN Categories ON ModelDevices.CategoryID = Categories.CategoryID WHERE ModelID = @modelID');
            if (result.recordset.length > 0) {
                const model = result.recordset[0];
                return new ModelDevices(model.ModelID, model.ModelName, model.ModelDes, model.CategoryID, model.CategoryName);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
 
    static async createModel(modelName, modelDes, categoryID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('modelName', mssql.Char, modelName)
                .input('modelDes', mssql.NVarChar, modelDes)
                .input('categoryID', mssql.Int, categoryID)
                .query('INSERT INTO ModelDevices (ModelName, ModelDes, CategoryID) OUTPUT INSERTED.* VALUES (@modelName,@modelDes,@categoryID)');
            const model = result.recordset[0];
            return new ModelDevices(model.ModelID, model.ModelName, model.ModelDes, model.CategoryID);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    
    static async updateModel(modelID, modelName, modelDes, categoryID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('modelID', mssql.Int, modelID)
                .input('modelName', mssql.Char, modelName)
                .input('modelDes', mssql.NVarChar, modelDes)
                .input('categoryID', mssql.Int, categoryID)
                .query('UPDATE ModelDevices SET ModelName = @modelName, ModelDes = @modelDes, CategoryID = @categoryID WHERE ModelID = @modelID; SELECT ModelDevices.*, Categories.CategoryName from ModelDevices  LEFT JOIN Categories ON ModelDevices.CategoryID = Categories.CategoryID WHERE ModelID = @modelID');
            const model = result.recordset[0];
            return new ModelDevices(model.ModelID, model.ModelName, model.ModelDes, model.CategoryID, model.CategoryName);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteModel(modelID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('modelID', mssql.Int, modelID)
                .query('DELETE FROM ModelDevices OUTPUT DELETED.* WHERE ModelID = @modelID');
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

module.exports = ModelDevices;
