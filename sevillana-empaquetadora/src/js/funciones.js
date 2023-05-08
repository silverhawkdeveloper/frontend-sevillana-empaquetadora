export let pedididos;

export async function mostrar_pedidos(url) {
    await fetch(url, {
        method: 'GET',
    })
        .then(respuesta => {
            if (respuesta.ok) return respuesta.json();
        })
        .then((datos) => {
            pedididos = datos;
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
    img.setAttribute('src', '/static/media/boton-emergencia.96bdd60a06715cf18206.png');
}

export function obtener_id(e) {
    let id = e.currentTarget.parentElement.parentElement.firstChild.value;
    return id;
}

export function crear_pedido(datos) {
    let pedido = {
        '_id': datos[0]._id,
        'usuario': datos[0].usuario[0],
        'producto': datos[0].producto[0],
        'cantidad': datos[0].cantidad,
        'caja': datos[0].caja[0],
        'merma': datos[0].merma,
        'fecha': datos[0].fecha,
    }
    return JSON.stringify(pedido)
}
