require('dotenv').config();

var config = {
    user:`${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PW}`,
    server: `${process.env.DB_SV}`,  
    database: `${process.env.DB_NAME}`,
    options: {
        trustServerCertificate: true, // Thêm nếu gặp vấn đề với chứng chỉ
        enableArithAbort: true,
        useUTC: false,
        parseJSON: true,
        padChar: false
        }
  };

module.exports = config;
