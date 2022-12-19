const express = require('express');
const cors = require('cors');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const logger = require('./lib/logger');

const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const securityRoute = require('./routes/security');
const billRoute = require('./routes/bill');
const cartItemRoute = require('./routes/cartItem');
const discountRoute = require('./routes/discount');
const orderRoute = require('./routes/order');
const fixturesRoute = require('./routes/fixture');
const { authenticateToken } = require('./services');
const { checkRole } = require('./services');
const { USER_ROLE } = require('./globals/type');

const app = express();

const corsOptions = {
  origin: process.env.CORS_OPTIONS,
  // optionsSuccessStatus: 200,
};
app.use(cors({ origin: corsOptions, credentials: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  logger().info('Hello World');
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
  authenticateToken,
  checkRole(USER_ROLE.ADMIN),
  productRoute
);

app.use('/cart_item', authenticateToken, cartItemRoute);

app.use('/discount', authenticateToken, discountRoute);

app.use('/order', authenticateToken, orderRoute);

app.use('/bill', authenticateToken, billRoute);

app.use('/fixture', fixturesRoute);

module.exports = app;
