const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
  console.log(req.params.url);
  // Obtengo proyecto actual
  const proyecto = await Proyectos.findOnee({where: {url:req.params.url}});
  console.log(proyecto);
  console.log(req.body);
  // res.send('Enviado');
  // leer el valor del input
  const{tarea} = req.body;
  const estado = 0; // incomplet=0
  const proyectoId = proyecto.id

  // Inserto tarea en la BBDD
  const resultado = await Tareas.create({tarea, estado, proyectoId});
  if (!resultado) {
    return next();
  }
  // redirecciono
  res.redirect(`/proyectos/${req.params.url}`);
}
