// Clase Factura, representa una factura emitida a un cliente con el detalle de compra
// atributos: tipo: indica si es contado o credito
//            nro: numero de factura
//            nroCliente: corresponde al nro de cliente registrado en el sistema
//            registros: es el detalle de compra de la factura, es un array de varios registros
//            vto: indica el vencimiento de la factura 
//            nroAnulación: corresponde a el nro de factura contado o de credito en caso de se para un recibo
//                          o nota de credito y a el nro de recibo o nota de crédito en caso de ser una 
//                          factura contado o de crédito. De esta forma se identifica a que documento está
//                          afectando.             
//
// metodos: getTipo(): devuele el tipo de factura
//          getNro(): devuelve el numero de factura
//          getNroCliente(): devuelve el numero de cliente
//          getRegistos(): devuelve array con los registros de la factura
//          getVto(): devuelve la fecha de vencimiento
//          verTotales(): metodo axiliar para ver el total de la factura sin iva
//          getTotal(): devuelve el total de la factura sin iva
//          getRegistrosImprimir(): genera un string para poder visualizar el detalle de la factura
//          totalMasIva(): devuelve el total iva incluido de la factura
class Factura {
    constructor(tipo, nro, nroCliente, registros, vto, nroAnulacion){
        this.tipo = tipo
        this.nro = nro;
        this.nroCliente = nroCliente;
        this.registros = registros;
        this.vto = vto;
        this.nroAnulacion = nroAnulacion
    }
    getTipo(){
        return this.tipo;
    }
    getNro(){
        return this.nro;
    }
    getNroCliente(){
        return this.nroCliente;
    }
    getRegistros(){
        return this.registros;
    }
    getVto(){
        return this.vto;
    }
    getnroAnulacion(){
        return this.nroAnulacion;
    }
    VerTotales(){
            let registros = this.getRegistros();
            registros.forEach((x) => {console.log(x)});
    }
    getTotal(){
        let total = 0;
        let registros = this.getRegistros();
        let subtotales = registros.map((x) => {
            return x.getTotalRegistro();
        })
        total = subtotales.reduce((acumulador, elemento) => acumulador + elemento, 0);
        return total;
    }
    getRegistrosImprimir(){
        let str = "";
        this.registros.forEach((item) => {
            str = str + "Codigo: " + item.getCodigo() + " Cantidad: " + item.getCantidad() + " Precio Unitario: " + item.getPrecioUnitario() + "\n"
        })
        return str
    }
    agregarDetalleRegistro(registroFactura){
        this.registros.push(registroFactura);
    }
    totalMasIVA(){
        return this.getTotal()*1.22;
    }
    imprimirFactura(){
        let str = "";
        fechaEmision = Date.now();
        let fechaHoy= new Date(fechaEmision);
        fechaVto = new Date(2022,9,4);
        const nroFact = this.getNro();
        const tipoFact = this.getTipo();
        const nroCli = this.getNroCliente();
        const registros = this.getRegistrosImprimir();
        const totalFact = roundToTwo(this.getTotal());
        const totalFactMasIVA = roundToTwo(this.totalMasIVA());

        str = "F A C T U R A    I N G R E S A D A:" + "\n" + "\n" +
            "Tipo de factura: " + tipoFact + "\n" +
            "Fecha factura: " + fechaHoy.toLocaleDateString() + "\n" + 
            "Numero de cliente: " + nroCli + "\n" +
            "Numero de factura: " + nroFact + "\n" + "\n" + 
            "Detalle: " + "\n" + registros + "\n" +
            "Total: $ " + totalFact + "\n" + 
            "Total mas IVA $ " + totalFactMasIVA;
        
        return str;
    
    }
}

// Clase Facturas, representa una colección de facturas emitidas 
// atributos: colFacturas: array de facturas
//
// metodos: getColFacturas(): devuelve el array con las facturas cargadas
//          agregarFactura(factura): agrega un objeto del tipo factura a la colección de facturas 
//                                   recibe un objeto del tipo factura
//          estaVacio(): devuelve true si la colección está vacia
//          eliminarFactura(nroFactura): elimina una factura de la colección, recibe un numero de factura 
//          mostrarFacturas(): devuelve un string con los datos de las facturas de la colección para ser mostrados 
//          mostrarNrosFacturas(): devuelve un string con los tipos de factura y los numeros de factura para ser 
//                                 mostrados
//          buscarFactura(nroFactura): devuelve un objeto del tipo factura, recibe un numero de factura para la busqueda
class Facturas{
    constructor(colFacturas){
        this.colFacturas = colFacturas
    }
    getColFacturas(){
        return this.colFacturas;
    }
    agregarFactura(factura){
        this.colFacturas.push(factura);
    }
    estaVacio(){
        let vacio = false;
        if(this.getColFacturas().length === 0){
            vacio = true;
        }
        return vacio;
    }
    eliminarFactura(nroFactura){
        colFacturas = this.getColFacturas();
        const indices = colFacturas.map((item) => {
            return item.getNro();
        })
        const indice = indices.indexOf(nroFactura);
        if (indice != -1){
            this.colFacturas.splice(indice,1);
        }
        return indice;
    }
    mostrarFacturas(){
        const colFacturas = this.getColFacturas();
        let str = "";
        colFacturas.forEach((item) => {
            str = str + "Tipo factura: " + item.getTipo() + 
                        " Numero factura: " + item.getNro() + 
                        " Numero Cliente: " + item.getNroCliente() + 
                        " Fecha vencimiento: " + item.getVto() + "\n" + 
                        " Detalle: " + "\n" + item.getRegistrosImprimir() + "\n" + "\n"
        })
        return str
    }

    mostrarNrosFacturas(){
        const colFacturas = this.getColFacturas();
        let str = "";
        colFacturas.forEach((item) => {
            str = str + "Tipo factura: " + item.getTipo() + 
                        " Numero factura: " + item.getNro() + "\n";
        })
        return str
    }
    buscarFactura(nroFactura){
        colFacturas = this.getColFacturas();
        const Factura = colFacturas.find((factura) => factura.nro == nroFactura);
        return Factura;
    }
}

// Clase RegistrosFactura, representa los registros o detalle de una factura emitida a un cliente
// atributos: codigo: indica el codigo del producto vendido
//            cantidad: indica la cantidad vendida del producto
//            precioUnitario: indica el precio por unidad del producto vendido
//            totalRegistro: corresponde al subtotal del registro, sin iva, cantidad por precio unitario
//
// metodos: getTipo(): devuele el tipo de factura
//          getNro(): devuelve el numero de factura
//          getNroCliente(): devuelve el numero de cliente
//          calculoTotalRegistro(): realiza el calculo de cantidad por precio unitario de un articulo
//          getTotalRegistro(): devuelve el total del registro 
class RegistroFactura {
    constructor(nroRenglon, codigo, cantidad, precioUnitario){
        this.nroRenglon = nroRenglon;
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.totalRegistro = this.getTotalRegistro();
    }
    getNroRenglon(){
        return this.nroRenglon;
    }
    getCodigo(){
        return this.codigo;
    }
    getCantidad(){
        return this.cantidad;
    }
    getPrecioUnitario(){
        return this.precioUnitario;
    }
    calculoTotalRegistro(){
        return this.cantidad * this.precioUnitario;
    }
    getTotalRegistro(){
        return this.calculoTotalRegistro();
    }    
}

// Clase Producto, representa los productos
// atributos: codigo: indica el codigo del producto vendido
//            nombre: indica el nombre del producto
//            stock: indica el stock del producto
//
// metodos: getNroCodigo(): devuele el codigo del producto
//          getNombre(): devuelve el nombre del producto
//          getStock(): devuelve el stock del producto
//          bajarStock(): realiza la baja del stock en la cantidad espeficicada
//          aumentarStock(): realiza el alza del stock en la cantidad espeficicada 
class Producto {
    constructor(codigo, nombre, stock){
        this.codigo = codigo;
        this.nombre = nombre;
        this.stock = stock;
    }
    getNroCodigo(){
        return this.codigo;
    }
    getNombre(){
        return this.nombre;
    }
    getStock(){
        return this.stock;
    }
    bajarStock(cantidad){
        this.stock = this.getStock() - cantidad;
    }
    aumentarStock(cantidad){
        this.stock = this.getStock() + cantidad;
    }
}

// Clase Producto, representa los productos del carrito de compras
// atributos: id: codigo id del producto
//            titulo: nombre del producto
//            img_src: url de la imagen del producto
//            descripción: descripcion del producto
//            precio: precio del producto
class Producto_shop {
    constructor(id, titulo, img_src, descripcion, precio){
        this.id = id
        this.titulo = titulo
        this.img_src = img_src
        this.descripcion = descripcion
        this.precio = precio
    }
}

// Clase Productos, representa una coleccion de productos 
// atributos: productos: colección de productos 
//            
// metodos: getProductos(): devuele la colección de productos
//          agregarProducto(): agrega un producto a la colección
//          eliminarProducto(): elimina un producto de la colección
class Productos {
    constructor(colProductos){
        this.productos = colProductos;
    }
    getProductos(){
        return this.productos;
    }
    agregarProducto(producto){
        this.productos.push(producto);
    }
    eliminarProducto(producto){
        this.productos.pop(producto);
    }
}

// Clase Pedido, representa un pedido correspondiente a los productos seleccionados en el carrito 
// atributos: usuario: indica el usuario que realizó el pedido
//            carrito: indica los productos que seleccionó el usuario en el pedido
//            fecha: indica la fecha del pedido
//
// metodos: getUsuario(): devuele el usuario
//          getCarrito(): devuelve el carrito con los productos
//          getFechaPedido(): devuelve la fecha del pedido
class Pedido{
    constructor(usuario, carrito, fecha){
        this.usuario = usuario;
        this.carrito = carrito;
        this.fecha = fecha;
    }
    getUsuario(){
        return this.usuario;
    }
    getCarrito(){
        return this.carrito;
    }
    getFechaPedido(){
        return this.fecha;
    }
}

// Clase Pedidos, representa una colección de pedidos correspondiente a los pedidos realizados por los usuarios 
// atributos: pedidos: indica la colección de pedidos
//            
// metodos: getPedidos(): devuele un array de pedidos
//          agregarPedido(): agrega un pedido a la colección de pedidos
//          eliminarPedido(): elimina un pedido de la colección de pedidos
class Pedidos{
    constructor(colPedidos){
        this.pedidos = colPedidos;
    }
    getPedidos(){
        return this.colPedidos;
    }
    agregarPedido(pedido){
        this.colPedidos.push(pedido);
    }
    eliminarPedido(pedido){
        this.pedido.pop(pedido);
    }
}


