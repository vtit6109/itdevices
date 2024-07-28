const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Category{
    constructor(id,categoryName ,categoryDes){
        this.id = id;
        this.categoryName = categoryName;
        this.categoryDes = categoryDes;
    } 

    static async getAllCategory(){
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM Categories');
            const categories = result.recordset.map(row => new Category(row.CategoryID, row.CategoryName, row.CategoryDes));
            return categories;
        } catch (error) {
            cconsole.error(error);
            return [];
        }
    }

    static async getCateByID(id) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .query('SELECT * FROM Categories WHERE CategoryID = @id');
                if (result.recordset.length > 0) {
                    const category = result.recordset[0];
                    return new Category(category.CategoryID, category.CategoryName, category.CategoryDes);
                } else {
                    return null;
                }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

        static async createCategory(categoryName, categoryDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('categoryName', mssql.NVarChar, categoryName)
                .input('categoryDes', mssql.NVarChar, categoryDes) 
                .query('INSERT INTO Categories(CategoryName, CategoryDes) OUTPUT INSERTED.* VALUES (@categoryName, @categoryDes)');
            const category = result.recordset[0];
            return new Category(category.CategoryID,category.CategoryName,category.CategoryDes);
        } catch (error) {
            console.error('Error creating Category:', error.message);
            console.error(error.stack);
            return null;
        }  
    }
    
    static async updateCategory(id, categoryName, categoryDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .input('categoryName', mssql.NVarChar, categoryName)
                .input('categoryDes', mssql.NVarChar, categoryDes)
                .query('UPDATE Categories SET CategoryName = @categoryName, CategoryDes = @categoryDes OUTPUT INSERTED.* WHERE CategoryID = @id');
            if (result.recordset.length > 0) {
                const category = result.recordset[0];
                return new Category(category.CategoryID, category.CategoryName, category.CategoryDes);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteCategory(id) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('id', mssql.Int, id)
                .query('DELETE FROM Categories OUTPUT DELETED.* WHERE CategoryID = @id');
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

module.exports = Category;
