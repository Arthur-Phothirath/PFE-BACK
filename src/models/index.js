const sequelize = require('../lib/db');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Bill = require('./Bill');
const Order = require('./Order');
const CartItem = require('./CartItem');
const Discount = require('./Discount');
const User = require('./User');

// User -- Order
User.hasMany(Order, { as: 'orders' });
Order.belongsTo(User, {
  foreignKey: 'UserId',
  as: 'user',
});

// Product - Category
Category.belongsToMany(Product, {
  as: 'products',
  through: 'Product_Category',
  foreignKey: 'category_id',
});

Product.belongsToMany(Category, {
  as: 'categories',
  through: 'Product_Category',
  foreignKey: 'product_id',
});

// Product - CartItem
Product.hasMany(CartItem, { as: 'cartitems' });
CartItem.belongsTo(Product, {
  foreignKey: 'ProductId',
  as: 'product',
});

// Order - Bill
Order.hasOne(Bill);
Bill.belongsTo(Order, {
  foreignKey: 'OrderId',
  as: 'order',
});

// Order - CartItem
Order.hasMany(CartItem, { as: 'cartitems' });
CartItem.belongsTo(Order, {
  foreignKey: 'OrderId',
  as: 'order',
});

// Order - Discount
Order.hasOne(Discount);
Discount.belongsTo(Order, {
  foreignKey: 'OrderId',
  as: 'order',
});

// Discount - Category
Category.hasMany(Discount, { as: 'discount' });
Discount.belongsTo(Category, {
  foreignKey: 'CategoryId',
  as: 'category',
});

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  sequelize,
  Product,
  Category,
  Bill,
  Order,
  CartItem,
  Discount,
  User,
};
