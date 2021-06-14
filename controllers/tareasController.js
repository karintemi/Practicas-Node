const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
  // Obtengo proyecto actual
  const proyecto = await Proyectos.findOne({where: {url:req.params.url}});
  // console.log(proyecto);
  // console.log(req.body);
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
  return res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req, res, next) => {
  const {id} = req.params;
  const tarea = await Tareas.findOne({where: {id}})

  // cambiar estado de tareas
  let estado = 0
  if (tarea.estado===estado) {
    estado = 1
  }
  tarea.estado = estado;

  const resultado = await tarea.save(tarea);
  if(!resultado) next();
  res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {
  const {id} = req.params;
  // Eliminar tarea
  const resultado = await Tareas.destroy({where: {id}});
  if(!resultado) next();
  res.status(200).send('Tarea eliminada correctamente');

}
