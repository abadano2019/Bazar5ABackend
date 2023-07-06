let registrosFactura = [];
let colFacturas = [];
let nroCliente = 0;
let fechaVto = "";
let numeroFactura = 0;

// Variables de fecha y usuario que se muestran en el head de la pagina
// El usuario corresponde al usuario que se logueo en la pagina login
// la fecha y hora corresponde al del momento de la facturación
// se usa local storage para pasar el usuario que realizó login

let today = new Date();
let now = today.toLocaleDateString('es-UY');

let usuario_activo = localStorage.getItem('usuario_activo');
let contenedor_usuario = document.getElementById('usuario');
contenedor_usuario.innerHTML = `<h3> Usuario: ${usuario_activo}</h3> 
                                <h3> Fecha: ${now}`;

let codigo = 0;
let cantidad = 0;
let precioUnitario = 0;

// Componentes tomados de la pagina Contado.html
let numeroCliente = document.getElementById("nroCliente");
let nroProducto = document.getElementById("nroProducto");
let cantidadProducto = document.getElementById("cantidad");
let precioUnitarioProd = document.getElementById("precioUnitario");
let div_nro_cliente = document.getElementById("div_nro_cliente");
let div_nro_cliente_render = document.getElementById("div_nro_cliente_render");
let tbodyDetalle = document.getElementById('tbodyDetalle');
let lbl_total = document.getElementById('id_label_total');
let vto_factura = document.getElementById('vto_factura');

// colección de facturas
let ColFacturas = new Facturas(colFacturas); 

// validación de los datos del formulario correspondiente a la carga de las lineas de la 
// factura
let frm = document.getElementById("formulario");
frm.addEventListener('submit',(e) =>{
    e.preventDefault();
    // validación de datos, deben ser numericos 
    if((isNaN(parseInt(numeroCliente.value))) || 
       (isNaN(parseInt(nroProducto.value))) ||
       (isNaN(parseInt(precioUnitarioProd.value))) ||
       (isNaN(parseInt(cantidadProducto.value))))
    {
        // en caso de no ser valores numericos, se emite mensaje y se borran todos los inputs
        alertaMensajeDelay("Debe ingresar valores numericos !!!", 2000,'center', 'error')
        if(registrosFactura.length === 0){
            numeroCliente.value = "";
        }
        nroProducto.value = "";
        precioUnitarioProd.value = ""
        cantidadProducto.value = ""
    }
    else
    {   
        // en caso de que no sean 0, se busca en nombre de la empresa, en caso de no existir
        // se borran todos los campos y se esperan nuevos valores
        nroCliente = parseInt(numeroCliente.value)
        codigo = parseInt(nroProducto.value);
        precioUnitario = parseInt(precioUnitarioProd.value);
        cantidad = parseInt(cantidadProducto.value);
        const nombreEmpresa = buscarEmpresa(nroCliente);
        const nombreProducto = buscarProducto(codigo); 
        
        if((nombreEmpresa === "") || (nombreProducto === "")){

            if((nombreEmpresa === "") && (nombreProducto === "")){
                alertaMensajeDelay("Empresa y Producto no registrados !!!",2000, 'center', 'error')
                numeroCliente.value = "";
                nroProducto.value = "";
            }else if((nombreEmpresa === "") && (!(nombreProducto === ""))){
                alertaMensajeDelay("Empresa no registrada !!!",2000, 'center', 'error')
                numeroCliente.value = "";
            }else{
                alertaMensajeDelay("Producto no registradao!!!",2000, 'center', 'error')
                nroProducto.value = "";
            }
        }
        else
        {
            // si los valores son numericos, se valida que la cantidad no sean cero
            if((parseInt(cantidadProducto.value) === 0))
            {
                alertaMensajeDelay("Cantidad no puede ser 0 !!!",2000, 'center', 'error')
                cantidadProducto.value = "";
            }    
            else
            {   
                // Si la empresa existe, se cambia el contenido del contenedor de nro de cliente por el nro y el nombre
                // se agrega la linea al array correspondiente, y se agrega al detalle de la factura (body html)
                div_nro_cliente.style.visibility = "hidden";
                div_nro_cliente_render.style.visibility = "visible";
                div_nro_cliente_render.innerHTML =  "<label>NUMERO CLIENTE: " + nroCliente+" EMPRESA: " + nombreEmpresa + "</label>";
                div_nro_cliente_render.classList.add="lblCliente"
                indice = registrosFactura.length;
                let stock = validarStock(codigo)
                if (stock >= cantidad){
                    nuevoRegistro = new RegistroFactura(indice+1,codigo,cantidad,precioUnitario);
                    registrosFactura.push(nuevoRegistro);
                    renderDetalleFactura(tbodyDetalle, registrosFactura, lbl_total)
                    precioUnitarioProd.value = "";
                    cantidadProducto.value = "";
                    nroProducto.value = "";
                }
                else
                {
                    alertaMensajeDelay("No hay stock suficiente !!!", 2000, 'center','warning')
                }
                    
                    
            }
        }
        
    }
})

// función para generar nueva factura, toma los registros cargadas, y el nro de cliente, mas un numero de factura 
// autogenerado, fecha vencimiento igual fecha del dia, y se carga a la colección de facturas del sistema
function facturar(){
    let factura;
    if (registrosFactura.length != 0){
        actualizarStock(registrosFactura);
        numeroFactura = getNroFactura();
        if(!(numeroFactura === null)){
            console.log(vto_factura.value)
            factura = new Factura("CREDITO",numeroFactura,nroCliente,registrosFactura,vto_factura.value,"");
            setNroFactura();
            let colFacturas = obtenerFacturas();
            ((colFacturas === null) || (colFacturas === undefined)) ? colFacturas = [] : "";
            console.log(colFacturas)
            let NewColFacturas = new Facturas(colFacturas);
            NewColFacturas.agregarFactura(factura);
            guardarFacturasLocalStorage(NewColFacturas);
            borrarRegistrosFactura(tbodyDetalle,lbl_total);
            div_nro_cliente_render.innerHTML = "";
            div_nro_cliente_render.style.visibility = "hidden";
            div_nro_cliente.style.visibility = "visible";
            numeroCliente.value ="";
            registrosFactura = new Array();
            alertaMensajeAnimado("Factura emitida",'success');        
        }
    }
    else
    {
        alertaMensajeDelay("Factura sin detalle para facturar !!!",2000,'center','warning')
    }
}

