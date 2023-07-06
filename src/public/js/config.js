// función que ejecuta la función cargarStockProductos
function stock(){
    let colProductos = cargarStockProductos();
    guardarProductos(colProductos);
    alertaMensaje("Stock de productos cargados")
}

// función que despliega los productos con los stock en la consola
// inptu: n/a
//
// output: un array con los productos
function verStock(){
    let colProductos = obtenerProductos();
    (colProductos) ? console.log(colProductos) : console.log("No existen productos cargados")
    return colProductos; 
}

// función que muestra por consola todas las variables del local storage
function VerLocalStorage(){
    console.log("USUARIO: " + localStorage.usuario_activo);
    console.log("STOCK: " + localStorage.stock);
    console.log("CARRITO: " + localStorage.carrito);
    console.log("PEDIDOS: " + localStorage.pedidos);
    console.log("FACTURAS: " + localStorage.facturas);
    console.log("FACTURAS: " + localStorage.nroFactura);
}

// función que borra el local storage
function borrarLocalStorage(){
  localStorage.clear();
  alertaMensaje("Local Storage borrado !!!!")
  setTimeout(function(){
    window.location.href = "http://127.0.0.1:3000/pages/login.html"
}, 2000);
  
}

// función para modificar el stock de un producto
// input: codProducto: codigo de producto
//        cantidad: cantidad a ser modificada del producto
// output: n/a
function modificarStock(codProducto, cantidad){

    let colProductos = obtenerProductos()
    if(colProductos == null){
        alertaMensaje("No hay stock cargado !!!");
        return null;
    }
    else
    { 
        let producto = "";
        for(let i=0; i<colProductos.length;i++)
        {
            if(colProductos[i].codigo == codProducto){
                producto = colProductos[i];
                break;
            }
        }

        if (producto == ""){
        
            alertaMensaje("producto no existe !!!");
            return null;
        }
        if (cantidad > 0){
            producto.stock = producto.stock + cantidad;
            alertaMensaje("Stock modificado");
        }
        else
        {
            if (producto.stock + cantidad < 0){
                alertaMensaje("cantidad ingresada es incorrecta !!! stock en negativo")
                return null;
            }
            else
            {   
                producto.stock = producto.stock + cantidad;
                alertaMensaje("Stock modificado");
            }
    }
        let colProductosModificada = new Productos(colProductos);
        guardarProductos(colProductosModificada);
    }
}

// función que solicita por pantalla el codigo de producto y cantidad para luego
// ejecutar la función modificarStock
function modificacionStockPorProducto(){
    let codProducto = parseInt(prompt("Ingrese codigo de producto: "))
    let cantidad = parseInt(prompt("ingrese cantidad: "))

    modificarStock(codProducto,cantidad)
}

// función que solicita por pantalla un numero que será utilizado como numero de factura actual
// se setea el primer numero de las facturas que luego se mantiene sumandole uno y se guarda en el localstorage
const configurarNroFactura = () =>{
    inicial = prompt("Ingrese nro de factura: ");
    if (isNaN(inicial) || es_NULL(inicial))
    {
        alertaMensaje("Debe ingresar un valor numerico")
    }
    else
    {
        alertaMensaje("Numero de factua configurado");
        localStorage.setItem('nroFactura', inicial);
    }    
}