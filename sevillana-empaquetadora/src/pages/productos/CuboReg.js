import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import cubo from '../../imagenes/figuras_geometricas/medidas_cubo.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/app.css';
import '../../css/productos/productos.css';

const CuboReg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Capturamos el cntr del boton eliminar
    // Si hemos accedido desde nuevo ocultamos el boton
    const boton_eliminar = document.getElementById('boton_eliminar')
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;
    const imagen = document.getElementById('imagen')
    let modificar_producto = localStorage.getItem('Modificar_producto');
    if (modificar_producto) {
      imagen.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos del producto';
    } else {
      boton_eliminar.style.display = 'none';
    }

    //Cargamos los datos locales
    const productoLocal = JSON.parse(localStorage.getItem('producto'));

    const descripcionHTML = document.getElementById('descripcion');
    const aristaHTML = document.getElementById('arista');

    fetch(`http://localhost:5000/producto/${productoLocal._id}`)
      .then(response => response.json())
      .then(data => {
        descripcionHTML.value = data[0].descripcion;
        aristaHTML.value = data[0].arista;
      })
  });

  function auth_token_profile(url, token, usuario) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(respuesta => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          logout();
        }
      })
      .then((datos) => {
        usuario.innerHTML = datos.email;
      });
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function guardar() {
    const productoLocal = JSON.parse(localStorage.getItem('producto'));
    const descripcionHTML = document.getElementById('descripcion');
    const aristaHTML = document.getElementById('arista');
    const url = `http://localhost:5000/producto/update/${productoLocal._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'descripcion': descripcionHTML.value,
        'arista': aristaHTML.valueAsNumber
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) return respuesta;
      })
      .then((datos) => {
        return datos;
      });

    localStorage.clear();
  }

  function eliminar() {
    const pedidoLocal = JSON.parse(localStorage.getItem('pedido'));
    const url = `http://localhost:5000/pedido/delete/${pedidoLocal._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((respuesta) => {
        if (respuesta.ok) return respuesta;
      })
      .then((datos) => {
        return datos;
      });
    localStorage.clear();
  }

  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={cajas_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >
      <div id="cntr_blanco">

        <div id="cntr_duo">

          <div id="imagen">
            <img id="imagen_figura" src={cubo} alt="logo sevillana empaquetadora" />
          </div>

          <div id="form">
            <div id="contenedor_texto"><h2>Mide el cubo</h2></div>

            <div id="cntr_formulario">
              <form id="form_estrecho">
                <input id="descripcion" type="text" placeholder="Descripción" />
                <input id="arista" type="number" min={1} placeholder="Arista" />
              </form>
            </div>

            <div id="cntr_botones">
              <div id="boton_eliminar">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Eliminar</p></div>
                  <div id="boton_imagen" onClick={eliminar}>
                    <Link to="/Productos"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
                  </div>
                </div>
              </div>

              <div id="cntr_boton_login">
                <div id="boton_texto"><p>Guardar</p></div>
                <div id="boton_imagen" onClick={guardar}>
                  <Link to="/Productos"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};

export default CuboReg;