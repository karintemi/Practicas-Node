const express=require('express');
const routes=require('./routes');
const path=require('path');
const bodyParser=require('body-parser');
// const expressValidator= require('express-validator');
const {check, validationResult} = require('express-validator');
// helpers con las unciones necesarias
const helpers = require('./helpers');
// Creo la conexion a la BBDD
const db=require('./config/db');
// Importo/sincronizo el modelo
require('./models/Proyectos');
db.sync()
  .then(() => console.log('Conectado al Servidor'))
  .catch(error => console.log(error));
// Creo una app de express
const app=express();
// Donde cargar los archivos estáticos
app.use(express.static('public'));
// Agregamos express validator a toda la aplicacion
// app.use(expressValidator());
// Habilitar Pug
app.set ('view engine', 'pug');
// Añadir carpeta de las vistas
app.set ('views', path.join(__dirname, './views'));
// Paso vardump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump();
  next();
})
// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes());
app.listen(3000);
