import { Producto } from "./modelo-producto.js";

export class Cubo extends Producto {
    /**
     * * Constructor del objeto Cubo.
     * @param {String} descripcion 
     * @param {Number} arista
     */
    constructor(descripcion, arista) {
        super(descripcion);
        this.arista = arista;
    }
    /**
     * * Método para calcular el volumen de un Cubo.
     * @returns Devuelve un valor numérico con el volumen en cm³ del Cubo.
     */
    calculoVolumen() {
        let volumen = Math.pow(this.arista, 3);
        return volumen;
    }
    /**
     * * Método para mostrar las aristas del objeto.
     * @returns Devuelve un array con las aristas del objeto ordenadas de menor a mayor.
     */
    arrayAristas() {
        let array = [this.arista, this.arista, this.arista];
        array.sort((a, b) => { return a - b });
        return array;
    }
    /**
     * * Método para mostrar el objeto Cubo.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = super.toString() + ' Arista: ' + this.arista;
        return string;
    }
}