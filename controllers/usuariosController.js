const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req, res) => {
  res.render('crearCuenta', {
    nombrePagina: 'Crear Cuenta en UpTask'
  });
}

exports.formIniciarSesion = (req, res) => {
  const {error} =res.locals.mensajes;
  res.render('iniciar-sesion', {
    nombrePagina: 'Iniciar Sesión en UpTask',
    error
  });
}

exports.crearCuenta = async (req, res) => {
  // Leer datos del usuario
  const {email, password} = req.body;

  try {
    // crear URl de confirmación
    const confirmarUrl=`http://${req.header.host}/confirmar/${email}`;
    // crear el objeto de usuario
    usuario = {
      email, password
    }
    // crear email
    await enviarEmail({
      usuario,
      subject: 'Confirma tu cuenta UpTask',
      confirmarUrl,
      archivo: 'confirmar-cuenta'
    });
    // crear cuenta
    await Usuarios.create({
      email, password
    });
    // redirigir al usuario
    req.flash('correcto', 'Te enviamos un correo. Confirma tu cuenta');
    res.redirect('/iniciar-sesion');
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message));
    res.render('crearCuenta', {
      mensajes: req.flash(),
      nombrePagina: 'Crear Cuenta en UpTask',
      email,
      password
    });
  }
}

exports.formReestablecerPassword = (req, res) => {
  res.render('reestablecer',{
    nombre: 'Reestablecer Password/Contraseña'
  });
}

// cambia el estado de una Cuenta
exports.confirmarCuenta = async (req, res) => {

  const usuario = await Usuarios.findOne({
    where: {
      email: req.params.correo
    }
  });
  // si no existe el usuario
  if (!usuario) {
    req.flash('error', 'No existe el usuario');
    res.redirect('/crear-cuenta');
  }
  usuario.activo = 1;
  await usuario.save();

  req.flash('correcto', 'Cuenta activada correctamente!');
  res.redirect('/iniciar-sesion');
}
