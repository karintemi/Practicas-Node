import Swal from 'sweetalert2';

export const actualizarAvance = () => {
  // seleccionar las tareas del proyecto
  const tareas = document.querySelectorAll('li.tarea');

  if (tareas.length) {
    // seleccionas las tareas completadas
    const tareasCompletas = document.querySelectorAll('i.completo');

    // calcular el avance
    const avance = Math.round((tareasCompletas.length/tareas.length)*100);

    // mostrar el avance
    const procentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance + '%';
    if (avance===100) {
      Swal.fire(
        'Proyecto Completado', 'Felicitaciones!, has completado todas las Tareas', 'success'
      )
    }
  }

}
alert('tareas');
