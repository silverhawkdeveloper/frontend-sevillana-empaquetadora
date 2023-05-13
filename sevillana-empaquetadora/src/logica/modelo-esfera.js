import { Producto } from "./modelo-producto.js";
export { Esfera }

class Esfera extends Producto{
    /**
     * * Constructor del objeto Esfera.
     * @param {String} descripcion
     * @param {Number} circunferencia
     */
    constructor(descripcion, circunferencia) {
        super(descripcion);
        this.circunferencia = circunferencia;
        this.radio = Number((this.circunferencia / (2 * Math.PI)).toFixed(4));
        this.diametro = 2 * this.radio;
    }
    /**
     * * Método para calcular el volumen de una Esfera.
     * @returns Devuelve un valor numérico con el volumen en cm³ de la Esfera.
     */
    calculoVolumen() {
        let volumen = Number((Math.PI * Math.pow(this.radio, 3) * (4/3)).toFixed(2));
        return volumen;
    }
    /**
     * * Método para mostrar las aristas del objeto.
     * @returns Devuelve un array con las aristas del objeto ordenadas de menor a mayor.
     */
    arrayAristas() {
        let array = new Array(this.diametro, this.diametro, this.diametro);
        array.sort((a, b) => { return a - b });
        return array;
    }
    /**
     * * Método para mostrar el objeto Esfera.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = super.descripcion + ' Circunferencia: ' + this.circunferencia + ' Radio: ' + this.radio;
        return string;
    }
}