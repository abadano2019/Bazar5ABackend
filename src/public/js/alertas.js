// función que utiliza libreria SweetAlert para enviar un mensaje por x cantidad de segundos
// input: mensaje: Mensaje a ser mostrado
//        milisec: cantidad de segundos a ser mostrado
//
// output: n/a
const alertaMensajeDelay = (mensaje, milisec, position, icono) =>{
    Swal.fire({
        position: position,
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: milisec
        
      })
}

// función que utiliza la libreria SweetAlert para enviar un mensaje
// input: mensaje: mensaje a ser mostrado
//
// output: n/a
const alertaMensaje = (mensaje) =>{
    Swal.fire(mensaje)
}

// función que utiliza la libreria SweetAlert para enviar un mensaje animado fade
// input: mensaje: mensaje a ser mostrado
//
// output: n/a
const alertaMensajeAnimado = (mensaje, icono) =>{
    Swal.fire({
        title: mensaje,
        icon: icono,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

// función que utiliza la libreria SweetAlert para enviar un mensaje con efecto stop timer
// input: mensaje: mensaje a ser mostrado
//
// output: n/a
const alertaMensajeStopTimer = (mensaje) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: mensaje
      })
}

