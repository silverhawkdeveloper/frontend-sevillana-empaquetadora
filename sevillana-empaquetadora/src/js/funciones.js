import boton_emer from '../imagenes/iconos/boton-emergencia.png';

export async function construir_tabla_empleados(datos, padre) {
    await datos.forEach(element => {
        const filaDato = document.createElement('tr');
        padre.appendChild(filaDato);

        const oculto = document.createElement('input');
        oculto.type = 'hidden';
        oculto.value = element._id;
        filaDato.appendChild(oculto);

        const role = document.createElement('td');
        filaDato.appendChild(role);
        role.innerHTML = element.role;

        const email = document.createElement('td');
        filaDato.appendChild(email);
        email.innerHTML = element.email;

        const nombre = document.createElement('td');
        filaDato.appendChild(nombre);
        nombre.innerHTML = element.nombre;

        const telefono = document.createElement('td');
        filaDato.appendChild(telefono);
        telefono.innerHTML = element.telefono;

        crear_boton(filaDato);
    });
}

export async function construir_tabla_cajas(datos, padre) {
    await datos.forEach(element => {
        const filaDato = document.createElement('tr');
        padre.appendChild(filaDato);

        const oculto = document.createElement('input');
        oculto.type = 'hidden';
        oculto.value = element._id;
        filaDato.appendChild(oculto);

        const descripcion = document.createElement('td');
        filaDato.appendChild(descripcion);
        descripcion.innerHTML = element.descripcion;

        const medidas = document.createElement('td');
        filaDato.appendChild(medidas);
        medidas.innerHTML = 'Alto: ' + element.alto + '<br/>' +
                                    'Ancho: ' + element.ancho + '<br/>' +
                                    'Profundo: ' + element.profundo;

        crear_boton(filaDato);
    });
}

export async function construir_tabla_productos(datos, padre) {
    await datos.forEach(element => {
        const filaDato = document.createElement('tr');
        padre.appendChild(filaDato);

        const oculto = document.createElement('input');
        oculto.type = 'hidden';
        oculto.value = element._id;
        filaDato.appendChild(oculto);

        const descripcion = document.createElement('td');
        filaDato.appendChild(descripcion);
        descripcion.innerHTML = element.descripcion;

        const tipo = document.createElement('td');
        filaDato.appendChild(tipo);
        tipo.innerHTML = element.tipo;

        const medidas = document.createElement('td');
        filaDato.appendChild(medidas);
        //medidas.setAttribute('style', 'text-align: initial');
        switch (element.tipo) {
            case 'Cubo':
                medidas.innerHTML = 'Aristas: ' + element.arista;
                break;
            case 'Ortoedro':
                medidas.innerHTML = 'Alto: ' + element.alto + '<br/>' +
                                    'Ancho: ' + element.ancho + '<br/>' +
                                    'Profundo: ' + element.profundo
                break;
            case 'Cilindro':
                medidas.innerHTML = 'Alto: ' + element.alto + '<br/>' +
                                    'Circunferencia: ' + element.circunferencia
                    break;
            case 'Esfera':
                medidas.innerHTML = 'Circunferencia: ' + element.circunferencia
                    break;
            default:
                break;
        }

        crear_boton(filaDato);
    });
}

export async function construir_tabla_pedidos(datos, padre) {
    await datos.forEach(element => {
        const fecha2 = new Date(element.fecha);
        const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const fechaFormateada = fecha2.toLocaleDateString('es-ES', opciones);

        const filaDato = document.createElement('tr');
        padre.appendChild(filaDato);

        const oculto = document.createElement('input');
        oculto.type = 'hidden';
        oculto.value = element._id;
        filaDato.appendChild(oculto);


        const fecha = document.createElement('td');
        filaDato.appendChild(fecha);
        fecha.innerHTML = fechaFormateada;
        const producto = document.createElement('td');
        filaDato.appendChild(producto);
        producto.innerHTML = element.producto[0].descripcion;
        const cantidad = document.createElement('td');
        filaDato.appendChild(cantidad);
        cantidad.innerHTML = element.cantidad;
        const merma = document.createElement('td');
        filaDato.appendChild(merma);
        merma.innerHTML = element.merma;
        const usuario = document.createElement('td');
        filaDato.appendChild(usuario);
        usuario.innerHTML = element.usuario[0].email;
        crear_boton(filaDato);
    });
}

function crear_boton(padre) {
    const td = document.createElement('td');
    padre.appendChild(td);
    const a = document.createElement('a');
    td.appendChild(a);
    a.setAttribute('class', 'guardarpedido')
    const img = document.createElement('img');
    a.appendChild(img);
    img.setAttribute('class', 'boton_emer');
    img.setAttribute('src', boton_emer);
    //img.setAttribute('src', '/static/media/boton-emergencia.96bdd60a06715cf18206.png');
}

export function obtener_id(e) {
    let id = e.currentTarget.parentElement.parentElement.firstChild.value;
    return id;
}
