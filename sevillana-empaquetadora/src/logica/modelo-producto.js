export class Producto {
    /**
     * * Constructor del objeto Producto.
     * @param {String} descripcion
     */
    constructor(descripcion) {
        this.descripcion = descripcion;
    }
    /**
     * * Método para mostrar el objeto Producto.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = this.descripcion;
        return string;
    }
}