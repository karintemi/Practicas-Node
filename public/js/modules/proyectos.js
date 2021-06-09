import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');
if (btnEliminar){
  btnEliminar.addEventListener('click', () => {
    Swal.fire({
      title: 'Está seguro de borrar este proyecto?',
      text: "No podra revertir o deshacer esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!',
      cancelButtonText: 'No, Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El proyecto fue borrado.',
          'success'
        );
        // Redireccionar al inicio
        setTimeout(() => {
          window.location.href = '/'
        }, 3000);
      }
    })
  })
}
export default btnEliminar
