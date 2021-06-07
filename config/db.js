const { Sequelize } = require('sequelize');

const db = new Sequelize('uptasknode', 'root', 'karin', {
  host: 'localhost',
  dialect: 'mysql'
  // ,
  // operatorAliases: false,

});
module.exports = db;
