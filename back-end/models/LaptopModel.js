const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class LaptopInfo {
    constructor(laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID, userName, modelName, categoryName, stateName, brandName, changesComponentsTitle, handoverTitle) {
        this.laptopID = laptopID;
        this.laptopName = laptopName;
        this.toolNumber = toolNumber;
        this.purchaseCode = purchaseCode;
        this.brandID = brandID;
        this.modelID = modelID;
        this.categoryID = categoryID;
        this.stateID = stateID;
        this.userID = userID;
        this.changesComponentsID = changesComponentsID;
        this.handoverID = handoverID;
        this.userName = userName;
        this.modelName = modelName;
        this.categoryName = categoryName;
        this.stateName = stateName;
        this.brandName = brandName;
        this.changesComponentsTitle = changesComponentsTitle;
        this.handoverTitle = handoverTitle;
    }
    static async getAllLaptop() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT LaptopInfo.*, Users.UserName, ModelDevices.ModelName, Categories.CategoryName, StateUsing.StateName, Brands.BrandName, HistoryChangesComponents.ChangesComponentsTitle, HistoryHandoverUser.HandoverTitle FROM LaptopInfo LEFT JOIN Users ON LaptopInfo.UserID = Users.UserID LEFT JOIN ModelDevices ON LaptopInfo.ModelID = ModelDevices.ModelID LEFT JOIN Categories ON LaptopInfo.CategoryID = Categories.CategoryID LEFT JOIN StateUsing ON LaptopInfo.StateID = StateUsing.StateID LEFT JOIN Brands ON LaptopInfo.BrandID = Brands.BrandID LEFT JOIN HistoryChangesComponents ON LaptopInfo.ChangesComponentsID = HistoryChangesComponents.ChangesComponentsID LEFT JOIN HistoryHandoverUser ON LaptopInfo.HandoverID = HistoryHandoverUser.HandoverID');
            console.log(result);
            const laptops = result.recordset.map(row => new LaptopInfo(row.LaptopID, row.LaptopName, row.ToolNumber, row.PurchaseCode,row.ModelID, row.CategoryID, row.BrandID, row.StateID, row.UserID, row.ChangesComponentsID, row.HandoverID , row.UserName, row.ModelName, row.CategoryName, row.StateName, row.BrandName, row.ChangesComponentsTitle, row.HandoverTitle));
            console.log(laptops)
            return laptops;
        } catch (error) {
            console.error(error);
            return ;
        }
    }

    static async getLaptopByID(laptopID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('laptopID', mssql.VarChar, laptopID)
                .query('SELECT LaptopInfo.*, Users.UserName, ModelDevices.ModelName, Categories.CategoryName, StateUsing.StateName, Brands.BrandName, HistoryChangesComponents.ChangesComponentsTitle, HistoryHandoverUser.HandoverTitle FROM LaptopInfo LEFT JOIN Users ON LaptopInfo.UserID = Users.UserID LEFT JOIN ModelDevices ON LaptopInfo.ModelID = ModelDevices.ModelID LEFT JOIN Categories ON LaptopInfo.CategoryID = Categories.CategoryID LEFT JOIN StateUsing ON LaptopInfo.StateID = StateUsing.StateID LEFT JOIN Brands ON LaptopInfo.BrandID = Brands.BrandID LEFT JOIN HistoryChangesComponents ON LaptopInfo.ChangesComponentsID = HistoryChangesComponents.ChangesComponentsID LEFT JOIN HistoryHandoverUser ON LaptopInfo.HandoverID = HistoryHandoverUser.HandoverID WHERE LaptopID = @laptopID');
            if (result.recordset.length > 0) {
                const laptopInfo = result.recordset[0];
                return new LaptopInfo(laptopInfo.LaptopID, laptopInfo.LaptopName, laptopInfo.ToolNumber, laptopInfo.PurchaseCode,laptopInfo.ModelID, laptopInfo.CategoryID, laptopInfo.BrandID, laptopInfo.StateID, laptopInfo.UserID, laptopInfo.ChangesComponentsID, laptopInfo.HandoverID , laptopInfo.UserName, laptopInfo.ModelName, laptopInfo.CategoryName, laptopInfo.StateName, laptopInfo.BrandName, laptopInfo.ChangesComponentsTitle, laptopInfo.HandoverTitle);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    static async createLaptop(laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID) {
        await poolConnect;
        try {
            //   // Kiểm tra xem laptopID đã tồn tại chưa
            // const checkResult = await request
            // .input('laptopID', mssql.Char, laptopID)
            // .query('SELECT COUNT(*) as count FROM LaptopInfo WHERE LaptopID = @laptopID');
    
            // if (checkResult.recordset[0].count > 0) {
            //     // Nếu laptopID đã tồn tại, ném ra lỗi
            //     throw new Error('Laptop ID already exists');
            // }
            const request = pool.request();
            const result = await request
                .input('laptopID', mssql.NVarChar, laptopID)
                .input('laptopName', mssql.NVarChar, laptopName)
                .input('toolNumber', mssql.NVarChar, toolNumber)
                .input('purchaseCode', mssql.NVarChar, purchaseCode)
                .input('brandID', mssql.Int, brandID)
                .input('modelID', mssql.Int, modelID)
                .input('categoryID', mssql.Int, categoryID)
                .input('stateID', mssql.Int, stateID)
                .input('userID', mssql.Int, userID)
                .input('changesComponentsID', mssql.Int, changesComponentsID)
                .input('handoverID', mssql.Int, handoverID)
                .query('INSERT INTO LaptopInfo (LaptopID, LaptopName, ToolNumber, PurchaseCode, BrandID, ModelID, CategoryID, StateID, UserID, ChangesComponentsID, HandoverID) OUTPUT INSERTED.* VALUES (@laptopID, @laptopName, @toolNumber, @purchaseCode, @brandID, @modelID, @categoryID, @stateID, @userID, @changesComponentsID, @handoverID)');
            const laptopInfo = result.recordset[0];
            return new LaptopInfo(laptopInfo.LaptopID, laptopInfo.LaptopName, laptopInfo.ToolNumber, laptopInfo.PurchaseCode, laptopInfo.BrandID, laptopInfo.ModelID, laptopInfo.CategoryID, laptopInfo.stateID, laptopInfo.UserID, laptopInfo.ChangesComponentsID, laptopInfo.HandoverID);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteLaptop(laptopID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('laptopID', mssql.Char, laptopID)
                .query('DELETE FROM LaptopInfo OUTPUT DELETED.* WHERE LaptopID = @laptopID');
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

    static async updateLaptop(laptopID, laptopName, toolNumber, purchaseCode, brandID, modelID, categoryID, stateID, userID, changesComponentsID, handoverID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('laptopID', mssql.Char, laptopID)
                .input('laptopName', mssql.NVarChar, laptopName)
                .input('toolNumber', mssql.Char, toolNumber)
                .input('purchaseCode', mssql.Char, purchaseCode)
                .input('brandID', mssql.Int, brandID)
                .input('modelID', mssql.Int, modelID)
                .input('categoryID', mssql.Int, categoryID)
                .input('stateID', mssql.Int, stateID)
                .input('userID', mssql.Int, userID)
                .input('changesComponentsID', mssql.Int, changesComponentsID)
                .input('handoverID', mssql.Int, handoverID)
                .query('UPDATE LaptopInfo SET LaptopName = @laptopName, ToolNumber = @toolNumber, PurchaseCode = @purchaseCode, BrandID = @brandID, ModelID = @modelID, CategoryID = @categoryID, StateID = @stateID, UserID = @userID, ChangesComponentsID = @changesComponentsID, HandoverID = @handoverID OUTPUT INSERTED.* WHERE LaptopID = @laptopID');
            const laptopInfo = result.recordset[0];
            return new LaptopInfo(laptopInfo.LaptopID, laptopInfo.LaptopName, laptopInfo.ToolNumber, laptopInfo.PurchaseCode, laptopInfo.BrandName, laptopInfo.ModelName, laptopInfo.CategoryName, laptopInfo.StateName, laptopInfo.UserName, laptopInfo.ChangesComponentsTitle, laptopInfo.HandoverTitle);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = LaptopInfo;
