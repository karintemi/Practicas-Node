const express = require('express');
const router = express.Router();
// Importar express validator para validar el body
const {body} = require('express-validator');

// Importar controladores
const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');
module.exports=function() {
  // ruta para el inicio
  router.get('/',
    authController.usuarioAutenticado,
    proyectosController.proyectosHome);
  router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);
  // Listar Proyecto
  router.get('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl);
  // Actualizar proyectos
  router.get('/proyecto/editar/:id',
    authController.usuarioAutenticado,
    proyectosController.formularioEditar);
  router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);
  // Eliminar proyecto
  router.delete('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto);
  // Tareas
  router.post('/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea);
  // Actualizar tareas
  router.patch('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea);
  // Borrar tarea
  router.delete('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.eliminarTarea);
  // Crear una cuenta de usuario
  router.get('/crear-cuenta', usuariosController.formCrearCuenta);
  router.post('/crear-cuenta', usuariosController.crearCuenta);
  router.get('/confirmar/:correo', usuariosController.confirmarCuenta);
  // Iniciar Sesión
  router.get('/iniciar-sesion',usuariosController.formIniciarSesion);
  router.post('/iniciar-sesion',authController.autenticarUsuario);
  // Cerrar Sesión
  router.get('/cerrar-sesion',authController.cerrarSesion);
  // Reestablecer password
  router.get('/reestablecer', usuariosController.formReestablecerPassword);
  router.post('/reestablecer',authController.enviarToken);
  router.get('/reestablecer/:token',authController.validarToken);
  router.post('/reestablecer/:token',authController.actualizarPassword);

  return router;
}
