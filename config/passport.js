const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Referencia a Modelo donde se autentica
const Usuarios = require('../models/Usuarios');

// local strategy - Login con credenciales propios (usuario y password)
passport.use (
  new LocalStrategy(
    // por default password espera un usuario y password
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {email,
                  activo: 1
                }
        });
        // Usuario existente pero password incorrecta
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: 'La contraseña/password ingresada es incorrecta'
          })
        }
        // Usuario y contraseña existentes
        return done(null, usuario);
      } catch (e) {
        // El usuario ingresado no existe
        return done(null, false, {
          message: 'El usuario/cuenta ingresado/a no existe!'
        })
      }
    }
  )
);

// serializar usuario
passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});
// deserializar usuario
passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
