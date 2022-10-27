const Sequelize = require('sequelize');
const pg = require('pg');
const connection = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: pg,
});

connection.authenticate().then(() => {
  console.log('Connection has been established successfully.');
});

module.exports = connection;
