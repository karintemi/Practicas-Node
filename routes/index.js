const express = require('express');
const router = express.Router();
// Importar express validator para validar el body
const {body} = require('express-validator');

// Importar el controlador
const proyectosController = require('../controllers/proyectosController');
module.exports=function() {
  // ruta para el inicio
  router.get('/',proyectosController.proyectosHome);
  // router.get('/nosotros', (req, res) =>{
  //   res.render('nosotros');
  // })
  router.get('/nuevo-proyecto',proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto',
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto);
  // Listar Proyecto
  router.get('/proyectos/:url', proyectosController.proyectoPorUrl);
  return router;
}
