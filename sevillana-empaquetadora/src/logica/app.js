
import { Cubo } from "./modelo-cubo.js";
import { Ortoedro } from "./modelo-ortoedro.js";
import { Cilindro } from "./modelo-cilindro.js";
import { Esfera } from "./modelo-esfera.js";
import { Caja } from "./modelo-caja.js";
import { Pedido } from "./modelo-pedido.js";
//import { Producto } from "./modelo-producto.js";
/*
// PRODUCTOS
let p1 = new Cubo('p1', 5);
let p2 = new Ortoedro('p2', 10, 30, 25);
let p3 = new Cilindro('p3', 40, 3.5);
let p4 = new Esfera('p4', 20);

// CAJAS
let c1 = new Caja('Caja 1', 30, 30, 30);
let c2 = new Caja('Caja 2', 10, 15, 40);
let c3 = new Caja('Caja 3', 40, 30, 30);

let arrayCajas = new Array(c1, c2, c3);


// PEDIDO
let fecha = new Date();

let pedido1 = new Pedido(fecha, p1, 53);
let pedido2 = new Pedido(fecha, p2, 17);
let pedido3 = new Pedido(fecha, p3, 23);
let pedido4 = new Pedido(fecha, p4, 26);

// PROBAMOS
let miResultado = empaquetar(pedido2);
*/

export function empaquetar(pedido, array) {

    //Creamos el producto de la petición
    let producto;
    switch (pedido.producto.tipo) {
        case 'Cubo':
            producto = new Cubo(pedido.producto.descripcion, pedido.producto.arista);
            break;
        case 'Ortoedro':
            producto = new Ortoedro(pedido.producto.descripcion,
                pedido.producto.alto, pedido.producto.ancho, pedido.producto.profundo);
            break;
        case 'Cilindro':

            break;
        case 'Esfera':

            break;

        default:
            break;
    }

    //Creamos las cajas de la petición
    let arrayCajas = new Array();
    array.forEach(elemeto_caja => {
        let caja = new Caja(elemeto_caja._id, elemeto_caja.descripcion, elemeto_caja.alto, 
            elemeto_caja.ancho, elemeto_caja.profundo);
            arrayCajas.push(caja);
    });

    // Descartar las cajas donde el producto no quepa.
    arrayCajas = seleccionCajas(arrayCajas, producto);

    // Almacenamos los productos.
    arrayCajas = guardarProducto(arrayCajas, producto, pedido.cantidad);

    // Elegimos la caja donde la merma de espacio y el numero de cajas sea menor.
    let resultado = seleccionCajaUnitaria(arrayCajas);

    return resultado;
}

/**
 * * Función donde se descartan las cajas donde no quepa al menos un producto.
 * @param {Array} cajas Array de todas las cajas que hay en la BBDD.
 * @param {Producto} producto Producto que queremos empaquetar.
 * @returns Devuelve un array con las cajas donde se puede almacenar el producto.
 */
function seleccionCajas(cajas, producto) {
    let arrayCajas = new Array();
    let capacidadTotal = 1;
    // Array con las aristas del producto ordenadas de menor a mayor.
    const aristasProducto = producto.arrayAristas();
    cajas.forEach((caja) => {
        // Array con las aristas de la caja ordenadas de menor a mayor.
        let aristas = caja.arrayAristas();
        // Bucle donde obtenemos la capacidad de la caja.
        for (let i = 0; i < aristas.length; i++) {
            let capacidad = Math.trunc(aristas[i] / aristasProducto[i]);
            capacidadTotal *= capacidad;
        }
        // Si la caja tiene capacidad para guardar al menos un producto.
        if (capacidadTotal > 0) arrayCajas.push(caja);
        capacidadTotal = 1;
    })
    return arrayCajas;
}

/**
 * * Función para calcular el número de cajas necesarias y la merma de las mismas.
 * @param {Array} cajas Array con las cajas que hemos seleccionado previamente.
 * @param {Producto} producto  Producto que queremos empaquetar.
 * @param {Number} cantidad Cantidad de productos del pedido.
 * @returns Devuelve un array con el número de cajas y la merma.
 */
function guardarProducto(cajas, producto, cantidad) {
    const aristasProducto = producto.arrayAristas();
    const volumenProducto = producto.calculoVolumen();
    let arrayCajasResultado = new Array();
    let productosCaja = 1;

    cajas.forEach((caja) => {
        // Objeto que vamos a devolver en el array
        let resultado =
        {
            _id: '',
            caja: '',
            numero_cajas: '',
            merma: ''
        }
        let aristas = caja.arrayAristas();
        for (let i = 0; i < aristas.length; i++) {
            const elementoAristaCaja = aristas[i];
            const elementoAristaProdructo = aristasProducto[i];
            let capacidad = Math.trunc(elementoAristaCaja / elementoAristaProdructo);
            // Cuantos productos caben en la caja
            productosCaja *= capacidad;
        }
        resultado.caja = caja.descripcion;
        resultado._id = caja._id;
        // Caben en una sola caja
        if (productosCaja > cantidad) {
            resultado.numero_cajas = 1;
            resultado.merma = caja.calculoVolumen() - cantidad * volumenProducto;
            // Se necesitan mas de una caja
        } else {
            let num_cajas = resultado.numero_cajas = Math.ceil(cantidad / productosCaja);
            let volumen;
            let merma = 0;
            let productosFaltantes = cantidad;
            // Procesamos la merma por caja
            for (let i = 1; i <= num_cajas; i++) {
                //productosFaltantes > productosCaja ? productosCaja : productosCaja = productosFaltantes
                if (productosFaltantes < productosCaja) productosCaja = productosFaltantes
                volumen = productosCaja * volumenProducto;
                merma += caja.calculoVolumen() - volumen;
                productosFaltantes -= productosCaja;
            }
            resultado.merma = Number(merma.toFixed(2));
        }
        // Reiniciamos la variable
        productosCaja = 1;
        arrayCajasResultado.push(resultado);
    });
    return arrayCajasResultado;
}

/**
 * * Función donde seleccionamos la caja para el pedido.
 * @param {Array} arrayCajas Array de las posibles cajas para realizar el pedido.
 * @returns Devolvemos un objeto con la selección de la caja.
 */
function seleccionCajaUnitaria(arrayCajas) {
    // Ordenamos el array por el número de cajas y por la merma.
    arrayCajas.sort((a, b) => {
        if (a.numero_cajas < b.numero_cajas) {
            return -1;
        } else if (a.numero_cajas > b.numero_cajas) {
            return 1;
        } else {
            if (a.merma < b.merma) {
                return -1;
            } else if (a.merma > b.merma) {
                return 1;
            } else {
                return 0;
            }
        }
    });
    return arrayCajas[0];
}