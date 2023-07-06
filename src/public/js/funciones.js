// const es_NULL = (str)
// const roundToTwo = (num)
// const vaciarArray = (array)
// function buscarEmpresa(nroCliente)
// function buscarProducto(nroProducto)
// function sumaDetalle(registros,suma)
// function renderCarrito(tbodyDetalle, filaDetalle, suma)
// function borrarRegistrosFactura(tbody, total)
// function guardarFacturasLocalStorage(colFacturas)
// const validar_usuario = (usuario, contrasena)
// function consulta_nivel_usuario(usuario)
// const validarDato = (str)
// function cargarStockProductos()
// function guardarProductos(colProductos)
// function obtenerProductos()
// function obtenerFacturas()
// function validarStock(codigo)
// function actualizarStock(colRegistrosFactura)
// function actualizarStockNC(colRegistrosFactura)
// const getNroFactura()
// const setNroFactura()


///////////////////////////////////////////////////////////////////////////////////////////////////

// Función para validar si un valor es null
// input: str: variable con el valor a verificar
//
// output: true en caso de que el valor sea null y false en caso contrario
const es_NULL = (str) =>{
  
    let resultado = (str == null) ? true : false;
    return resultado;
}

// Función para realizar redondeo de centesimos
// input: num: numero con decimales a reondear
//
// output: numero con decimales redondeados hasta 2 lugares
const roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}

// Función para realizar el vaciado de un array 
// input: array: corresponde a un array con datos a ser borrados
//
// output: devuelve el array vacio
const vaciarArray = (array) =>{
    
    while(array.length !=0){
        array.pop();
    }
}

// Función que representa base de datos de empresas disponibles para facturar 
// input: nroCliente: corresponde al numero de empresa a realizar facturación
//
// output: nombre de empresa en caso de existir, string vacio en caso de no existir
function buscarEmpresa(nroCliente)
{   
    let empresa = "";
    empresa = tabla_empresas(nroCliente);
    return empresa;
}

// Función que representa base de datos de empresas disponibles para facturar 
// input: nroCliente: corresponde al numero de empresa a realizar facturación
//
// output: nombre de empresa en caso de existir, string vacio en caso de no existir
function buscarProducto(nroProducto)
{   
    let producto = "";
    producto = tabla_productos(nroProducto);
    return producto;
}

// funión para mostrar por pantalla la suma de los importes de los productos seleccionados en la factura
// calcula el iva y muestra el total mas iva
// input: registros: colección de registros de detalles de una factura
//        suma: elemento html a modificar par mostrar resultado
// output: n/a
function sumaDetalle(registros,suma){

    let total = 0;
    let iva = 0;
    let totalIva = 0;
    
    registros.forEach((item) => {
        total = total + item.getCantidad()*item.getPrecioUnitario()
    })

    iva = total * 0.22;
    totalIva = total + iva;
    suma.innerHTML= `TOTAL:&nbsp;&nbsp;$${total}`;
}

// Función para agregar lineas al detalle de la factura, toma los datos nro.producto, cantidad y 
// precio unitario y agrega la linea al detalle de la factura  
// input: tbodyDetalle: corresponde al body del detalle de la factura para agregar lineas
//        filaDetalle: corresponde a la fila de datos que se agregaran al detalle de la factura
//
// output: no tiene, agrega linea al body del detalle de factura
function renderDetalleFactura(tbodyDetalle, filaDetalle, suma){
    tbodyDetalle.innerHTML = "";
    if (!filaDetalle.length >= 1) {return null}
    filaDetalle.map((item) => {
        const tr = document.createElement('tr');
        tr.classList.add('detalleFactura')
        const Content =
         `  <th scope="row">${item.nroRenglon}</th>
            <td class="table__productos">
                <p>${item.codigo}</p>
            </td>
            <td class="table__precios">
                <p>${item.cantidad}</p>
            </td>
            <td class="table__cantidades">
                <p>${item.precioUnitario}</p>
            </td>
        `
        console.log(Content)
        tr.innerHTML = "";
        tr.innerHTML = Content;
        tbodyDetalle.append(tr);
    })

    sumaDetalle(filaDetalle, suma);
}

// función para borrar registros de detalle de una factura
// input: tbody: body de la tabla donde se encuetran las registros de la factura a borrar
//        total: elemento html para mostrar total = 0
//
// output: n/a
function borrarRegistrosFactura(tbody, total){
    tbody.innerHTML = "";
    total.innerHTML = `TOTAL:&nbsp;&nbsp;$0`;
}

// función para guardar una colección de facturas en el local storage
// input: colFacturas: colección de facturas
//
// output: n/a
function guardarFacturasLocalStorage(colFacturas){
    localStorage.setItem("facturas", JSON.stringify(colFacturas));    
}

// Función para validar usurio y contraseña, recibe ambos parametros y valida contra la base de datos
// input: usuario: usuario a validar contra base de datos
//        contrasena: contraseña a validar contra base de datos
//
// output: codigo = 1: usuario y contraseña ingresados son correctos
//         codigo = 0: usuario y contraseña ingresados no son correctos
const validar_usuario = (usuario, contrasena) => {

    let codigo = tabla_usuario(usuario, contrasena);

    return codigo;
}

// función que devuelve el nivel de privilegio de un usuario
// input: usuario: usuario a validar
// 
// output: nivel de privilegio
function consulta_nivel_usuario(usuario){
    return tabla_usuario_nivel(usuario);
}

// Función para realizar validaciones sobre los datos ingresados por pantalla, mientras el dato que 
// ingresa no sea un numero, se continua pidiendo el valor, con el botón cancelar se sale de la ventana 
// y del menu.
// input: str: corresponde al dato ingresado
//
// output: devuelve el dato ingresado y se actualiza la variable global salir
const validarDato = (str) =>{
    do {
        dato = prompt(str);
        if(es_NULL(dato)){
            salir = true;
        }
    }while ((isNaN(parseInt(dato))) & (!salir))

    return dato;
}

// función auxiliar utilizada para cargar stock a los productos
function cargarStockProductos(){

    let JM = new Producto(1,"Juego Menage",100);
    let VP = new Producto(2,"Vasos plásticos",100);
    let FC = new Producto(3,"Fuente Cerámica",100);
    let JC = new Producto(4,"Juego de cubiertos",100);
    let SC = new Producto(5,"Set cubiertos",100);
    let M = new Producto(6,"Menage",100);
    let JA = new Producto(7,"Juego de asaderas",100);
    let FV = new Producto(8,"Fuente de vidrio",100);
    let AP = new Producto(9,"Asadera con parrilla",100);
    let B = new Producto(10,"Budinera",100);
    let E = new Producto(11,"Exprimidor",100);
    let EP = new Producto(12,"Exprimidor de palanca",100);
    let EJ = new Producto(13,"Exprimidor con jarra",100);
    let J = new Producto(14,"Juguera",100);
    let C = new Producto(15,"Cafetera",100);
    let CDG = new Producto(16,"Cafetera Dolce Gusto",100);

    let coleccionProductos = [];
    let colProductos = new Productos(coleccionProductos)

    colProductos.agregarProducto(JM);
    colProductos.agregarProducto(VP);
    colProductos.agregarProducto(FC);
    colProductos.agregarProducto(JC);
    colProductos.agregarProducto(SC);
    colProductos.agregarProducto(M);
    colProductos.agregarProducto(JA);
    colProductos.agregarProducto(FV);
    colProductos.agregarProducto(AP);
    colProductos.agregarProducto(B);
    colProductos.agregarProducto(E);
    colProductos.agregarProducto(EP);
    colProductos.agregarProducto(EJ);
    colProductos.agregarProducto(J);
    colProductos.agregarProducto(C);
    colProductos.agregarProducto(CDG);
    return colProductos;
}

// función para guardar los productos en el local storage
function guardarProductos(colProductos){
    localStorage.setItem("stock", JSON.stringify(colProductos));
}

// función para obtener del local storage los productos
// input: n/a
//
// output: array de productos en caso de no estar vacio de lo contrario devuelve null
function obtenerProductos(){
    let colProductos = JSON.parse(localStorage.getItem('stock')) || [];
    let resultado = (colProductos == null) ? colProductos : colProductos.productos
    return resultado;
}

const obtenerFacturas = () =>{
   
    return (JSON.parse(localStorage.getItem('facturas')))?.colFacturas;

}
// función que devuelve el stock cargado para un producto
// input: codigo: codigo de producto
//
// output: stock para el producto consultado
function validarStock(codigo){
    codigo = parseInt(codigo);
    let productos = obtenerProductos();
    (productos==null) && alertaMensaje("Sin productos en Stock")
    if(productos){
        const producto = productos.find((prod)=>prod.codigo === codigo)
        return producto.stock
    }   
}

// función utilizada para actualizar los stock de productos luego de emitir una factura
// se recorre el detalle de la factura y se baja del stock la cantidad de productos facturados
// input: colRegistosFactura que representa la colección de los detalles (registros) de la factura
// 
// output: n/a 
function actualizarStock(colRegistrosFactura){
    let productos = obtenerProductos();
    if(colRegistrosFactura){
        colRegistrosFactura.forEach((registro) =>{
            let stock = registro.stock;
            if(registro.cantidad > stock){
                alertaMensaje("Codigo producto: " + colRegistrosFactura[i].codigo + " sin stock suficiente");
            }
            else
            {
                const producto = productos.find((prod)=>prod.codigo === registro.codigo)
                producto.stock = producto.stock - registro.cantidad; 
                productosActualizado = new Productos(productos);
                guardarProductos(productosActualizado); 
            }
        })
    }
}

// función utilizada para actualizar los stock de productos luego de emitir una factura
// se recorre el detalle de la factura y se da de alta en el stock la cantidad de productos facturados
// input: input: colRegistosFactura que representa la colección de los detalles (registros) de la factura
// 
// output: n/a 
function actualizarStockNC(colRegistrosFactura){
    let productos = obtenerProductos();
    if(colRegistrosFactura){
        colRegistrosFactura.forEach((registro) =>{
            const producto = productos.find((prod)=>prod.codigo === registro.codigo)
            producto.stock = producto.stock + registro.cantidad; 
            productosActualizado = new Productos(productos);
            guardarProductos(productosActualizado); 
            
        })
    }
}

// funcion que devuelve nro de factura almacenado en storageel local storage, en caso de no existir numero cargado
// se devuelve null y un mensaje informando.
// input: n/a
//
// output: nroFactura guardado en el local storage
const getNroFactura = () =>{
    let nroFactura = localStorage.getItem('nroFactura');
    (nroFactura === null) && alertaMensaje("No hay número de Factura asigando, comuniquese con el administrador del sistema");
    return nroFactura;
}

// funcion que setea un nuevo nro de factura y lo almacena en el local storage
// input: n/a
//
// output: n/a
const setNroFactura = () =>{
    let nroFactura = localStorage.getItem('nroFactura');
    let nextNroFactura = parseInt(nroFactura) + 1;
    localStorage.setItem('nroFactura', nextNroFactura)
}

