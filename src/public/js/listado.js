// función para guardar una colección de facturas en el local storage
// input: colFacturas: colección de facturas
//
// output: n/a
function guardarFacturasLocalStorage(colFacturas){
    localStorage.setItem("facturas", JSON.stringify(colFacturas));
}

// función para listar facturas, toma del local storage una colección de facturas y despliega 
// por pantalla todas las facturas que tiene almacenadas
function listarFacturas(){
    let colFacturas = obtenerFacturas()
    console.log("Facturas: " + colFacturas)
    if(colFacturas == null)
    {
        alertaMensaje("No existen facturas cargadas !!!");
    }
    else
    {   
        let registros = "";
        let content = "";
        let total = 0;
        colFacturas.forEach(item => {
            let div = document.createElement("div");
            content =
            `  <h3>Tipo de Factura: ${item.tipo}</h3>
                <h3>Numero Cliente: ${item.nroCliente} </h3>
                <h3>Numero factura: ${item.nro}</h3>
                <h3>Vto Factura: ${item.vto}</h3>
                <h3>Factura Anulación: ${item.nroAnulacion}</h3>
            `  
                detalle = item.registros;
                //nroRenglon, codigo, cantidad, precioUnitario)
                registros = "";
                total = 0;
                detalle.forEach((reg) => {
                    registros = registros + 
                                ` <h3>Item Nro.: ${reg.nroRenglon}</h3>
                                <h3>Codigo Producto: ${reg.codigo}</3>
                                <h3>Cantidad: ${reg.cantidad}</3>
                                <h3>Precio Unitario: ${reg.precioUnitario}</3>
                                `
                    total = total + reg.cantidad*reg.precioUnitario;
                })
            div.innerHTML = content + registros + "<h3>Total factura: "+ total+" </3>"+"<br></br><br></br>";
            document.body.append(div);
            })
    }
}

// función para listar facturas, toma del local storage una colección de facturas y despliega 
// por pantalla todas las facturas que tiene almacenadas
function listarStock(){
    let stock = obtenerProductos();
    
    if (!stock){
        alertaMensaje("No hay stock ingresado");
        stock = []
    }
    
    stock.forEach(item => {
        let div = document.createElement("div");
        content =
        `  <h3>Codigo Producto: ${item.codigo}</h3>
            <h3>Nombre Producto: ${item.nombre} </h3>
            <h3>Stock: ${item.stock}</h3>
            <br>
        `  
        div.innerHTML = content;
        document.body.append(div);
    })
    
}

// función que redirecciona a la pagina de facturas contado
const btnFacturas_volver = (pag) =>{
    window.history.back()
    
}

// función que redirecciona a la pagina de menú central
const btnMenu_volver = () =>{
    window.location.href = "http://127.0.0.1:3000/pages/menu.html"
}

// función para listar pedidos ingresados en el local storage
function listarPedidos(){
    const pedidosStorage = localStorage.getItem("pedidos");
    
    let pedidos = [];
    if (!(pedidosStorage === null)){
        let pedidosJSON = JSON.parse(pedidosStorage);
        pedidos = pedidosJSON;
        
    }
    else
    {
        alertaMensaje("No hay pedidos ingresados");   
    }
               
    pedidos.forEach(item => {
        let content="";
        let div = document.createElement("div");
        content =
         `  
            <h3>Cliente: ${item.usuario}</h3>
            <h3>Fecha de Pedido: ${item.fecha}</h3>
            <br>
        `    
            carrito=item.carrito;
            carrito.forEach((prod)=>{
                content = content +
                `
                    <h3>Nro Id: ${prod.nro}</h3>
                    <h3>Articulo: ${prod.title}</h3>
                    <h3>Cantidad: ${prod.cantidad}</h3>
                    <h3>Precio Unitario: ${prod.precio}</h3>
                    <br><br>
                `
            })
        div.innerHTML = content;
        document.body.append(div);
    })
}