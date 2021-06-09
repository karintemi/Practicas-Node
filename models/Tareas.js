const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');

const Tareas = db.define('tareas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tarea: {type: DataTypes.STRING(100)},
  estado: {type: DataTypes.INTEGER(1)}
});
// Relacion varios a uno
Tareas.belongsTo(Proyectos);

module.exports = Tareas;
