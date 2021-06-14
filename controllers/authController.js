const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const crypto = require('crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt=require('bcryptjs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
});

// Funcion para verificar si el usuario está autenticado
exports.usuarioAutenticado = (req, res, next) => {
  // si el usuario está autenticado, sigue
  if (req.isAuthenticated()) {
    return next();
  }
  // si no esta autenticado redirije al formulario
  res.redirect('/iniciar-sesion');
}

// Funcion para cerrar sesión
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion');
  })
};

// Envia un token para un usuario válido
exports.enviarToken = async (req, res) =>{
  // Verifica existencia del usuario
  const usuario = await Usuarios.findOne({where: {email: req.body.email}});

  if (!usuario) {
    req.flash('error', 'No existe esa Cuenta');
    res.render('reestablecer');
  }
  // usuario existe, actualiza token y actualiza
  usuario.token = crypto.randomBytes(20).toString('hex');
  usuario.expiracion = Date.now + 3600000;
  usuario.save();
  const resetUrl=`http://${req.header.host}/reestablecer/${usuario.token}`;
  // Enviar email con token
  await enviarEmail({
    usuario,
    subject: 'Reset Password',
    resetUrl,
    archivo: 'reestablece-password'
  });
  // terminar proceso de envio
  req.flash('correcto', 'Se envió un mensaje a tu correo');
  res.redirect('/iniciar-sesion');
};

exports.validarToken = async (rec, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token
    }
  });
  // no encuentra el usuario
  if (!usuario) {
    req.flash('error', 'No Válido');
    res.redirect('/reestablecer');
  }

  // Formularo para generar password
  res.render('resetPassword', {
    nombrePagina: 'Reestablecer Password/Contraseña'
  });
}

exports.actualizarPassword = async (rec, res) => {
  // Verifica token valido y fecha de expiracion
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {[Op.gte]: Date.now()}
    }
  });
  // no encuentra el usuario
  if (!usuario) {
    req.flash('error', 'No Válido');
    res.redirect('/reestablecer');
  }
  // Hashear el password
  usuario.password = bcrypt.hashsSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;
  // guardo el nuevo password
  await usuario.save();
  req.flash('correcto', 'La contraseña/password se ha modificado correctamente');
  res.redirect('/iniciar-sesion');
}
