const express = require('express');
const cors = require('cors');
console.log(process.env.NODE_ENV, 'nodeenv');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const securityRoute = require('./routes/security');
const billRoute = require('./routes/bill');
const { authenticateToken } = require('./services');
const { checkRole } = require('./services');
const { USER_ROLE } = require('./globals/type');

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.use(securityRoute);

app.use('/user', authenticateToken, checkRole(USER_ROLE.ADMIN), userRoute);
app.use(
  '/category',
  authenticateToken,
  checkRole(USER_ROLE.ADMIN),
  categoryRoute
);
app.use(
  '/product',
  // authenticateToken,
  // checkRole(USER_ROLE.ADMIN),
  productRoute
);
app.use('/bill', billRoute);

module.exports = app;
