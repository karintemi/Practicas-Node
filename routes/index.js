const express = require('express');
const router = express.Router();

// Importar el controlador
const proyectosController = require('../controllers/proyectosController');
// ruta para el inicio
router.get('/',proyectosController.proyectosHome);
module.exports=function() {
  router.get('/nosotros', (req, res) =>{
    res.render('nosotros');
  })
    return router;
}
