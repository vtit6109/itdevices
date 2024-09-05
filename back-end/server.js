const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Import middleware
const { authMiddleware } = require('./middleware/authMiddleware');

// Import modules
const users = require('./routes/UserRouter');
const departments = require('./routes/DepartmentsRouter');
const categories = require('./routes/CategoryRouter');
const states = require('./routes/StateRouter');
const brands = require('./routes/BrandRouter');
const positions = require('./routes/PositionRouter');
const models = require('./routes/ModelDevicesRouter');
const historyChange = require('./routes/HTRChangeRouter');
const handover = require('./routes/HandoverRouter');
const laptop = require('./routes/LaptopRouter');
const authRouter = require('./routes/AuthRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// auth middleware
app.use(authMiddleware);

// Use router
app.use('/itdevices/auth', authRouter);
app.use('/itdevices/users', users);
app.use('/itdevices/departments', departments);
app.use('/itdevices/categories', categories);
app.use('/itdevices/stateusings', states);
app.use('/itdevices/brands', brands);
app.use('/itdevices/positions', positions);
app.use('/itdevices/models', models);
app.use('/itdevices/historychanges', historyChange);
app.use('/itdevices/handovers', handover);
app.use('/itdevices/laptops', laptop);

// Sử dụng thư mục 'public' để phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
