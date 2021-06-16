const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.js');
const Proyectos = require('../models/Proyectos');
const bcrypt=require('bcryptjs');


const Usuarios = db.define('usuarios', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Agrega un correo válido'
        },
        notEmpty: {
          msg: 'El email no puede ir vacio'
        }
      },
      unique: {
        args: true,
        msg: 'Hay un usuario ya registrado con ese correo'
      }
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El Paswwword no puede ir vacío'
        }
      }
    },
    activo: { type:  DataTypes.STRING,
              defaultValue: 0
     },
    token: { type:  DataTypes.STRING },
    expiracion: { type: DataTypes.DATE }
  },{
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
      }
    }
  });

// Métodos personalizados
Usuarios.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;
