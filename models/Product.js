const { Model, DataTypes } = require("sequelize");
const sequelize = require("../connection");

class Product extends Model {}
Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Category" }
);

module.exports = Product;
