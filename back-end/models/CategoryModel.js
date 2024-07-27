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

    
}

module.exports = Category;
