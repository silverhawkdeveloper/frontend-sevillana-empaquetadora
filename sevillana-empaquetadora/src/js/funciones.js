
export function auth_token_profile(url, token, usuario, div1, div2) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    })
        .then(respuesta => {
            if (respuesta.ok) return respuesta.json();
        })
        .then((datos) => {
            console.log(datos);
            usuario.innerHTML = datos.email;
            if (datos.role === 'user') {
                div1.style.display = 'none'
                div2.style.display = 'none'
            }
        });
}