// Función que consulta de la tabla de base de datos, el nivel de privilegios para una pagina
// input: nivel: nivel de privilegio
//        pag: pagina a ser accedida 
//
// output: true: en caso de autorizar el nivel para la pagina
//         false: en caso de no autorizar el nivel para la pagina 
function validar_nivel_pag(nivel, pag){
    return tabla_seguridad(nivel,pag)
}

// Función que valida el acceso de un usuario a una pagina de acuerdo al nivel de privilegio
// input: pag: pagina a ser accedida 
//
// output: n/a
// Nota: en caso de no autorizarse el acceso se redirecciona a una pagina con mensaje de error
function validarSeguridad(pag){
   
    let usuario = localStorage.getItem('usuario_activo');
    console.log(usuario)
    let nivel = consulta_nivel_usuario(usuario);
   
    if (!validar_nivel_pag(nivel,pag)){
        
        window.location.href = "http://127.0.0.1:3000/pages/error.html";
    }

}