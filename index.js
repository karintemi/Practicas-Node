const express=require('express');
const routes=require('./routes');
const path=require('path');
// Creo una app de express
const app=express();
// Habilitar Pug
app.set ('view engine', 'pug');
// Añadir carpeta de las vistas
app.set ('views', path.join(__dirname, './views'));

// app.use('/', routes());
// const  productos=[
//   {
//     producto: 'Libro',
//     precio: 20
//   },
//   {
//     producto: 'Computadora',
//     precio: 1520
//   }
// ]
// // ruta para el inicio
// app.use('/',(req, res) => {
//   // res.send('Hola');
//   // res.send(productos);
//   // res.json(productos);
//   res.send('productos');
// });
app.listen(3000);
