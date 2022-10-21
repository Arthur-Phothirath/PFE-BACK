const sequelize = require('../lib/db');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Bill = require('../models/Bill');

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

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  sequelize,
  Product,
  Category,
  Bill,
};
