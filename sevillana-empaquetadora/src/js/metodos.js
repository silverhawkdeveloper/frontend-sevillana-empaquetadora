/*************************** GET ***************************/
//FETCH
fetch("pagina.json/php")
    .then((respuesta) => {
        if (respuesta.ok) return respuesta.json();
    })
    .then((datos) => {
        return datos;
    });

//XMLHTTPREQUEST
if (XMLHttpRequest) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let resuesta = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "pagina.json");
    xhr.send();
}

/*************************** POST ***************************/
//FETCH
fetch("pagina.json/php", {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    },
    body: JSON.stringify(datos),
})
    .then((respuesta) => {
        if (respuesta.ok) return respuesta.json();
    })
    .then((datos) => {
        return datos;
    });

//XMLHTTPREQUEST
if (XMLHttpRequest) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let respuesta = JSON.parse(xhr.responseText);
        }
    };
    xhr.open('POST', 'pagina.json/php');
    xhr.send(JSON.stringify(datos));
}

/*************************** ALMACENAMIENTO ***************************/
function setAlmacenamiento(arrayUsuario) {
    sessionStorage.setItem("arrayUsuario", JSON.stringify(arrayUsuario));
}

function getAlmacenamiento() {
    let objetoarrayUsuario = JSON.parse(sessionStorage.getItem("arrayUsuario"));
    if (objetoarrayUsuario == null) objetoarrayUsuario = new Array();
    return objetoarrayUsuario;
}

function deleteAlmacenamiento() {
    sessionStorage.clear();
}

/*************************** Ejemplo asincrono ***************************/
async function peticionProducto(id) {
    const response = await fetch(`http://localhost:5000/producto/${id}`);
    const data = await response.json();
    return data;
}

async function peticionProducto(id) {
    const response = await fetch('http://localhost:5000/producto/mostrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: id
        })
    });
    const data = await response.json();
    return data;
}