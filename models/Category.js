const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connection');

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'Category' }
);

module.exports = Category;
