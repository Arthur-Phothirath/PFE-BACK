const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

class CartItem extends Model {}

CartItem.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'CartItem' }
);

module.exports = CartItem;
