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

// Componentes tomados de la pagina Contado.html
let numeroCliente = document.getElementById("nroCliente");
let nroProducto = document.getElementById("nroProducto");
let cantidadProducto = document.getElementById("cantidad");
let precioUnitarioProd = document.getElementById("precioUnitario");
let div_nro_cliente = document.getElementById("div_nro_cliente");
let div_nro_cliente_render = document.getElementById("div_nro_cliente_render");
let tbodyDetalle = document.getElementById('tbodyDetalle');
let lbl_total_NC = document.getElementById('id_label_total_NC');


let nroFactura = document.getElementById("nroNC");
nroFactura.addEventListener('blur', ()=> cargarDatosFactura());

function cargarDatosFactura(){
    
    let facturas = obtenerFacturas();
    let factura = facturas.find((fact) => fact.nro == parseInt(nroFactura.value))
    
    if (factura?.tipo === "CREDITO"){

        const nroCliente = factura.nroCliente
        const nombreEmpresa = buscarEmpresa(nroCliente);
        const registros = factura.registros
        div_nro_cliente_render.style.visibility = "visible";
        div_nro_cliente_render.innerHTML =  "<label>NUMERO CLIENTE: " + nroCliente+" EMPRESA: " + nombreEmpresa + "</label>";
        div_nro_cliente_render.classList.add="lblCliente"

        tbodyDetalle.innerHTML = "";
        let total = 0;
        registros.forEach(item => {
            const tr = document.createElement('tr');
            tr.classList.add('detalleFactura');
            let content = 
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
            tr.innerHTML = "";
            tr.innerHTML = content;
            tbodyDetalle.append(tr);
            total = total + item.cantidad*item.precioUnitario;
        });
        
        lbl_total_NC.innerHTML = `TOTAL:&nbsp;&nbsp;$${total}`;

    }
    else
    {
        alertaMensajeAnimado("Nro de factura ingresado no corresponde a una factura de CREDITO",'error');
    }
}

const emitirRecibo = () =>{
  

    let facturas = obtenerFacturas();
    let factura = facturas.find((fact) => fact.nro == parseInt(nroFactura.value))
    
    if (!factura) {

        alertaMensaje("Debe ingresar un nro de factura")
    }
    else
    {
        if(factura.nroAnulacion === ""){
            facturaActual = getNroFactura();
            console.log(facturaActual)
            notaCredito = new Factura("RECIBO",facturaActual,factura.nroCliente,factura.registros,now, factura.nro);
            setNroFactura();
            console.log(factura.registros)
            actualizarStockNC(factura.registros)
            factura.nroAnulacion = facturaActual;
            console.log(factura)
            let NewColFacturas = new Facturas(facturas);
            console.log(NewColFacturas)
            NewColFacturas.agregarFactura(notaCredito);
            guardarFacturasLocalStorage(NewColFacturas);
            borrarRegistrosFactura(tbodyDetalle,lbl_total_NC);
            div_nro_cliente_render.innerHTML = "";
            div_nro_cliente_render.style.visibility = "hidden";
            nroFactura.value ="";
            alertaMensajeAnimado("Recibo emitido",'success');
        }    
        else
        {
            alertaMensajeAnimado("Esta factura astá anulada o tiene recibo asociado !!!!!")
        }
    }
}