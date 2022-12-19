const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

class Order extends Model {}

const ORDER_STATUS = {
  pending: 'pending',
  paid: 'paid',
  canceled: 'canceled',
};

Order.init(
  {
    status: {
      type: DataTypes.ENUM(Object.values(ORDER_STATUS)),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Order' }
);

module.exports = Order;
