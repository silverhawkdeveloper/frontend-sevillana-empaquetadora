export class Pedido {
    /**
     * * Constructor del objeto Pedido.
     * @param {String} fecha 
     * @param {Producto} producto 
     * @param {Number} cantidad
     */
    constructor(fecha, producto, cantidad) {
        this.fecha = fecha;
        this.producto = producto;
        this.cantidad = cantidad;
    }
    /**
     * * Método para mostrar el objeto Pedido.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = 'Fecha: ' + this.fecha + ' Producto: ' + this.producto + ' Cantidad: ' + this.cantidad;
        return string;
    }
}