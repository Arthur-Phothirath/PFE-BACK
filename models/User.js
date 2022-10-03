const { Model, DataTypes } = require('sequelize');
const sequelize = require('../lib/db');
const bcrypt = require('bcryptjs');

class User extends Model {}

const USER_ROLE = {
  guest: 'guest',
  admin: 'admin',
};

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valided: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.ENUM(Object.values(USER_ROLE)),
      defaultValue: USER_ROLE.guest,
    },
  },
  { sequelize, modelName: 'User' }
);

User.addHook('beforeCreate', (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

User.addHook('beforeUpdate', (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
});

module.exports = User;
