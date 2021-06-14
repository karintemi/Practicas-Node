const express=require('express');
const routes=require('./routes');
const path=require('path');
const bodyParser=require('body-parser');
const flash= require('connect-flash');
const session= require('express-session');
const cookieParser= require('cookie-parser');
const passport = require('./config/passport');

const {check, validationResult} = require('express-validator');
// helpers con las unciones necesarias
const helpers = require('./helpers');
// Creo la conexion a la BBDD
const db=require('./config/db');
// Importo/sincronizo el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');
db.sync({alter: true})
  .then(() => console.log('Conectado al Servidor'))
  .catch(error => console.log(error));
// Creo una app de express
const app=express();
// Donde cargar los archivos estáticos
app.use(express.static('public'));
app.set ('view engine', 'pug');
// Habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({extended: true}));
// Añadir carpeta de las vistas
app.set ('views', path.join(__dirname, './views'));
// Agregar flash-connect
app.use(flash());

app.use(cookieParser());
// session nos permite navegar entre distintas páginas sin autenticar
app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// Paso vardump a la aplicación
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump();
  res.locals.mensajes = req.flash();
  res.locals.usuario = {...req.user} || null;
  next();
})
app.use('/', routes());
app.listen(3000);

// require('./handlers/email');
