const mssql = require('mssql');
const config = require('../config/database');

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

class Department {
    constructor(deptID, deptName, deptDes){
        this.deptID = deptID;
        this.deptName = deptName;
        this.deptDes = deptDes;
    }

    static async getAllDepts() {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request.query('SELECT * FROM Departments');
            console.log(result);
            const depts = result.recordset.map(row => new Department(row.DeptID, row.DeptName, row.DeptDes)); // row.Dept... là row.<Field của table not field của Contructor>
            console.log(depts);
            return depts;
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    static async getDeptByID(deptID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('deptID', mssql.Int, deptID)
                .query('SELECT * FROM Departments WHERE DeptID = @deptID');
                if (result.recordset.length > 0) {
                    const dept = result.recordset[0];
                    return new Department(dept.DeptID, dept.DeptName, dept.DeptDes);
                } else {
                    return null;
                }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

        static async createDept(deptName, deptDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('deptName', mssql.NVarChar, deptName)
                .input('deptDes', mssql.NVarChar, deptDes) 
                .query('INSERT INTO Departments(DeptName, DeptDes) OUTPUT INSERTED.* VALUES (@deptName, @deptDes)');
            const dept = result.recordset[0];
            return new Department(dept.DeptID,dept.DeptName,dept.DeptDes);
        } catch (error) {
            console.error('Error creating Department:', error.message);
            console.error(error.stack);
            return null;
        }  
    }
    static async updateDept(deptID, deptName, deptDes) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('deptID', mssql.Int, deptID)
                .input('deptName', mssql.NVarChar, deptName)
                .input('deptDes', mssql.NVarChar, deptDes)
                .query('UPDATE Departments SET DeptName = @deptName, DeptDes = @deptDes OUTPUT INSERTED.* WHERE DeptID = @deptID');
            if (result.recordset.length > 0) {
                const dept = result.recordset[0];
                return new Department(dept.DeptID, dept.DeptName, dept.DeptDes);
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    static async deleteDept(deptID) {
        await poolConnect;
        try {
            const request = pool.request();
            const result = await request
                .input('deptID', mssql.Int, deptID)
                .query('DELETE FROM Departments OUTPUT DELETED.* WHERE DeptID = @deptID');
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

module.exports = Department;
