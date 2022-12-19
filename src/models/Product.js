const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price_init: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_sale: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Product' }
);

module.exports = Product;
