const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

class Bill extends Model {}

Bill.init(
  {
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Bill' }
);

module.exports = Bill;
