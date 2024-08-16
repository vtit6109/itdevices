const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import modules ----------------------------------------------------------------
const users = require('./routes/UserRouter');
const departments = require('./routes/DepartmentsRouter')
const categories = require('./routes/CategoryRouter')
const states = require('./routes/StateRouter')
const brands = require('./routes/BrandRouter')
const positions = require('./routes/PositionRouter')
const models = require('./routes/ModelDevicesRouter')
const historyChange = require('./routes/HTRChangeRouter')
const handover = require('./routes/HandoverRouter')
const laptop = require('./routes/LaptopRouter')
const authMiddleware = require('./middleware/authMiddleware');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
//Xử lý dữ liệu JSON: app.use(bodyParser.json()) giúp Express.js hiểu và xử lý dữ liệu JSON được gửi trong body của yêu cầu HTTP. Điều này rất hữu ích khi bạn gửi dữ liệu dưới dạng JSON từ client.
//Xử lý dữ liệu URL-encoded: app.use(bodyParser.urlencoded({ extended: true })) giúp Express.js xử lý dữ liệu URL-encoded, thường được sử dụng khi gửi dữ liệu từ các form HTML. Tùy chọn { extended: true } cho phép xử lý các đối tượng phức tạp hơn (nested objects).

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Use router ----------------------------------------------------------------
app.use('/itdevices/users', users); // test all methods ok
app.use('/itdevices/departments', departments); // test all methods ok
app.use('/itdevices/categories', categories); // test all methods ok
app.use('/itdevices/stateusings',states); // test all methods ok
app.use('/itdevices/brands',brands);  // test all methods okk
app.use('/itdevices/positions',positions) // test all methods ok
app.use('/itdevices/models',models) //test all methods ok
app.use('/itdevices/historychanges',historyChange) // test all methods ok
app.use('/itdevices/handovers',handover) // test all methods ok
// app.use('/itdevices/laptops',authMiddleware,laptop) // with access token method 
app.use('/itdevices/laptops',laptop) // test all methods ok








// Sử dụng thư mục 'public' để phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
