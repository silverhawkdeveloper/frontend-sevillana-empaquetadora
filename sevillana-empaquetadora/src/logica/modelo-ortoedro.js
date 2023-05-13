import { Producto } from "./modelo-producto.js";
export { Ortoedro }

class Ortoedro extends Producto{
    /**
     * * Constructor del objeto Ortoedro.
     * @param {String} descripcion 
     * @param {Number} alto 
     * @param {Number} ancho 
     * @param {Number} profundo 
     */
    constructor(descripcion, alto, ancho, profundo) {
        super(descripcion);
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
    }
    /**
     * * Método para calcular el volumen de un Ortoedro.
     * @returns Devuelve un valor numérico con el volumen en cm³ del Ortoedro.
     */
    calculoVolumen() {
        let volumen = this.alto * this.ancho * this.profundo;
        return volumen;
    }
    /**
     * * Método para mostrar las aristas del objeto.
     * @returns Devuelve un array con las aristas del objeto ordenadas de menor a mayor.
     */
    arrayAristas() {
        let array = new Array(this.alto, this.ancho, this.profundo);
        array.sort((a, b) => { return a - b });
        return array;
    }
    /**
     * * Método para mostrar el objeto Ortoedro.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = this.descripcion + ' Alto: ' + this.alto + ' Ancho: ' + this.ancho + ' Profundo: ' + this.profundo;
        return string;
    }
}