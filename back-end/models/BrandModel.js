const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Brand{
    constructor(brandID, brandName, brandDes){
        this.brandID = brandID;
        this.brandName = brandName;
        this.brandDes = brandDes;
    }

    static async getAllBrands() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM Brands');
            const brands = result.recordset.map(row => new Brand(row.BrandID, row.BrandName, row.BrandDes));
            return brands;
        } catch (error) {
            console.error(error);
        }
    }

    static async getBrandById(brandID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('brandID', mssql.Int, brandID)
            .query('SELECT * FROM Brands WHERE BrandID = @brandID');
            const brand = result.recordset[0];
            return new Brand(brand.BrandID, brand.BrandName, brand.BrandDes);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async createBrand(brandName, brandDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('brandName', mssql.NVarChar, brandName)
            .input('brandDes', mssql.NVarChar, brandDes)
            .query('INSERT INTO Brands (BrandName, BrandDes) OUTPUT INSERTED.* VALUES (@brandName, @brandDes)');
            const brand = result.recordset[0];
            return new Brand(brand.BrandID, brand.BrandName, brand.BrandDes);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async updateBrand(brandID, brandName, brandDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('brandID', mssql.Int, brandID)
            .input('brandName', mssql.NVarChar, brandName)
            .input('brandDes', mssql.NVarChar, brandDes)
            .query('UPDATE Brands SET BrandName = @brandName, BrandDes = @brandDes OUTPUT INSERTED.* WHERE BrandID = @brandID');
            if (result.recordset.length > 0) {
                const brand = result.recordset[0];
                return new Brand(brand.BrandID, brand.BrandName, brand.BrandDes);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    static async deleteBrand(brandID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
            .input('brandID', mssql.Int, brandID)
            .query('DELETE FROM Brands OUTPUT INSERTED.* WHERE BrandID = @brandID');
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

module.exports = Brand;

