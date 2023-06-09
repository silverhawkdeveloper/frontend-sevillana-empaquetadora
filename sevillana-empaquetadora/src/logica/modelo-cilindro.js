import { Producto } from "./modelo-producto.js";

export class Cilindro extends Producto{
    /**
     * * Constructor del objeto Cilindro.
     * @param {String} descripcion 
     * @param {Number} alto
     * @param {Number} circunferencia
     */
    constructor(descripcion, alto, circunferencia) {
        super(descripcion);
        this.alto = alto;
        this.circunferencia = circunferencia;
        this.radio = Number((this.circunferencia / (2 * Math.PI)).toFixed(4));
        this.diametro = 2 * this.radio;
    }

    /**
     * * Método para calcular el volumen de un Cilindro.
     * @returns Devuelve un valor numérico con el volumen en cm³ del Cilindro.
     */
    calculoVolumen() {
        let volumen = Number((Math.PI * Math.pow(this.radio, 2) * this.alto).toFixed(2));
        return volumen;
    }

    /**
     * * Método para mostrar las aristas del objeto.
     * @returns Devuelve un array con las aristas del objeto ordenadas de menor a mayor.
     */
    arrayAristas() {
        let array = [this.alto, this.diametro, this.diametro];
        array.sort((a, b) => { return a - b });
        return array;
    }

    /**
     * * Método para mostrar el objeto Cilindro.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = super.descripcion + ' Alto: ' + this.alto + ' Circunferencia: ' + this.circunferencia + ' Radio: ' + this.radio;
        return string;
    }
}