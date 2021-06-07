const Proyectos = require('../models/Proyectos');
const slug = require('slug');

exports.proyectosHome = async(req, res) => {
  const proyectos = await Proyectos.findAll();
  // res.send('Index');
  res.render('index', {
    nombrePagina : 'Proyectos',
    proyectos
  });
};
exports.formularioProyecto = async(req, res) => {
  const proyectos = await Proyectos.findAll();

  res.render('nuevoProyecto',{
    nombrePagina: 'Nuevo Proyecto',
    proyectos
  });
};
exports.nuevoProyecto = async(req, res) => {
  const proyectos = await Proyectos.findAll();

  // Enviar a la consolo la ingresado por el usuario
  // console.log(req.body);
  const {nombre} = req.body;
  let errores = [];
  if (!nombre) {
    errores.push({'texto': 'El proyecto debe tener un nombre!'})
  }
  if (errores.length > 0) {
    res.render('nuevoProyecto',{
      nombrePagina: 'Nuevo Proyecto',
      errores,
      proyectos
    })
  }
  else {
    // insertar en la BBDD
    const url = slug(nombre).toLowerCase();
    const proyect = await Proyectos.create({nombre, url});
      // .then(() => console.log('Proyecto insertado correctamente'))
      // .catch(error => console.log(error));
    console.log(url);
    res.redirect('/');
  }
}

exports.proyectoPorUrl = async(req, res, next) => {
  // res.send('Listo');
  const proyectos = await Proyectos.findAll();

  const proyecto = await Proyectos.findOne({
    where: {
      url: req.params.url
    }
  });
  if (!proyecto) {
    return next();
  }
  // render de la vista
  res.render('tareas', {
    nombrePagina : 'Tareas del Proyecto',
    proyecto,
    proyectos
  });
  console.log(proyecto);
  res.send('OK');
}
