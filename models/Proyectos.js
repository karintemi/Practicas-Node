const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.js');
const slug = require('slug');
const shortId=require('shortid');

const Proyectos = db.define('proyectos', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
  nombre: {type: DataTypes.STRING},
  url: {type: DataTypes.STRING}
},{
  hooks: {
    beforeCreate(proyecto) {
      const url = slug(proyecto.nombre).toLowerCase();

      proyecto.url=`${url}-${shortId.generate()}`;
    }
  }
});

module.exports = Proyectos;
