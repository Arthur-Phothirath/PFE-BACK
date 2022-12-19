// controllers index.js
const billController = require('./bill.js');
const cartItemController = require('./cartItem.js');
const categoryController = require('./category.js');
const discountController = require('./discount.js');
const fixtureController = require('./fixture.js');
const orderController = require('./order.js');
const productController = require('./product.js');
const securityController = require('./security.js');
const userController = require('./user.js');

module.exports = {
  productController,
  categoryController,
  billController,
  cartItemController,
  discountController,
  fixtureController,
  orderController,
  securityController,
  userController,
};
