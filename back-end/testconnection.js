const mssql = require('mssql');
const config = require('./config/database'); 

console.log(config); // In ra cấu hình để kiểm tra

(async () => {
    try {
        const pool = await mssql.connect(config);
        console.log('Connected to SQL Server successfully!');
        pool.close(); 
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
    }
})();



