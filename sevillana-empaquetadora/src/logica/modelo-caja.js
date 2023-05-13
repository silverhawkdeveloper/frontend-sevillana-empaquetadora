export { Caja }

class Caja {
    /**
     * * Constructor del objeto Caja.
     * @param {String} descripcion 
     * @param {Number} alto 
     * @param {Number} ancho 
     * @param {Number} profundo 
     */
    constructor(descripcion, alto, ancho, profundo) {
        this.descripcion = descripcion;
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
    }
    /**
     * * Método para calcular el volumen de una caja.
     * @returns Devuelve un valor numérico con el volumen en cm³ de la caja.
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
     * * Método para mostrar el objeto Caja.
     * @returns Devuelve una cadena con la información del objeto.
     */
    toString() {
        let string = this.descripcion + ' Alto: ' + this.alto + ' Ancho: ' + this.ancho + ' Profundo: ' + this.profundo;
        return string;
    }
}