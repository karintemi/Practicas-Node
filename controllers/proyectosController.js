const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');
const slug = require('slug');

exports.proyectosHome = async(req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
  res.render('index', {
    nombrePagina : 'Proyectos',
    proyectos
  });
};
exports.formularioProyecto = async(req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where:{usuarioId}});

  res.render('nuevoProyecto',{
    nombrePagina: 'Nuevo Proyecto',
    proyectos
  });
};
exports.nuevoProyecto = async(req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectos = await Proyectos.findAll({where:{usuarioId}});

  // Enviar a la consolo la ingresado por el usuario
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
    const usuarioId = res.locals.usuario.id;
    await Proyectos.create({nombre, usuarioId});
    res.redirect('/');
  }
}

exports.proyectoPorUrl = async(req, res, next) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({where:{usuarioId}});
  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
      usuarioId
    }
  });
  // Para ejecutar lo de arriba los convierto a promesas y sin await y ejecuto en paralelo
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
  // Traer tareas del proyecto
  const tareas = await Tareas.findAll({
    where: {
      proyectoId : proyecto.id
    },
    // Lo que sigue es una especie de join de tareas con proyectos, ahora no lo necesitamos
    // include: [
    //   {model: Proyectos}
    // ]
  });
  if (!proyecto) {
    return next();
  }
  // render de la vista
  res.render('tareas', {
    nombrePagina : 'Tareas del Proyecto',
    proyecto,
    proyectos,
    tareas
  });
}
exports.formularioEditar = async(req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = Proyectos.findAll({where:{usuarioId}});
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
      usuarioId
    }
  });
  // Para ejecutar lo de arriba los convierto a promesas y sin await y ejecuto en paralelo
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

  // render a la vistas
  res.render('nuevoProyecto', {
    nombrePagina: 'Editar Proyecto',
    proyectos,
    proyecto
  })
}

exports.actualizarProyecto = async(req, res) => {
  const usuarioId = res.locals.usuario.id;
  const proyectosPromise = await Proyectos.findAll({where:{usuarioId}});

  // Enviar a la consolo la ingresado por el usuario
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
    await Proyectos.update(
      {nombre: nombre},
      {where: {id: req.params.id}}
    );
    res.redirect('/');
  }
}

exports.eliminarProyecto = async(req, res, next) => {

  const {urlProyecto} = req.query;
  const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

  if (!resultado) {
    return next();
  }
  res.status(200).send('Proyecto eliminado correctamente')
}
