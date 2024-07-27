const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // Thêm body-parser
const app = express();
const port = 3000;

// Import modules ----------------------------------------------------------------
const users = require('./routes/UserRouter');
const departments = require('./routes/DepartmentsRouter')
const categories = require('./routes/CategoryRouter')

// Middleware ----------------------------------------------------------------
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//Xử lý dữ liệu JSON: app.use(bodyParser.json()) giúp Express.js hiểu và xử lý dữ liệu JSON được gửi trong body của yêu cầu HTTP. Điều này rất hữu ích khi bạn gửi dữ liệu dưới dạng JSON từ client.
//Xử lý dữ liệu URL-encoded: app.use(bodyParser.urlencoded({ extended: true })) giúp Express.js xử lý dữ liệu URL-encoded, thường được sử dụng khi gửi dữ liệu từ các form HTML. Tùy chọn { extended: true } cho phép xử lý các đối tượng phức tạp hơn (nested objects).

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Use router ----------------------------------------------------------------
app.use('/itdevices/users', users);
app.use('/itdevices/departments', departments);
app.use('/itdevices/categories', categories);

// Sử dụng thư mục 'public' để phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
