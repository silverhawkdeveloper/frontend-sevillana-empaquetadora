// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagen
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import cubo from '../../imagenes/figuras_geometricas/medidas_cubo.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
// CSS
import '../../css/app.css';
import '../../css/productos/productos.css';

const CuboReg = () => {
  const navigate = useNavigate();
  localStorage.setItem('tipo', 'Cubo');

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';
    // Capturamos el cntr del boton eliminar
    // Si hemos accedido desde nuevo ocultamos el boton
    const boton_eliminar = document.getElementById('boton_eliminar');
    const boton_guardar = document.getElementById('boton_guardar');
    const boton_nuevo = document.getElementById('boton_nuevo');
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;
    const imagen = document.getElementById('imagen')
    let modificar_producto = localStorage.getItem('Modificar_producto');

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    if (modificar_producto) {
      // Constantes
      // Cargamos los datos locales
      const productoLocal = JSON.parse(localStorage.getItem('producto'));
      const descripcionHTML = document.getElementById('descripcion');
      const aristaHTML = document.getElementById('arista');

      boton_nuevo.style.display = 'none';
      imagen.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos del producto';

      fetch(`http://localhost:5000/producto/${productoLocal._id}`)
        .then(response => response.json())
        .then(data => {
          descripcionHTML.value = data[0].descripcion;
          aristaHTML.value = data[0].arista;
        })
    } else {
      boton_eliminar.style.display = 'none';
      boton_guardar.style.display = 'none';
    }
  });

  /**
   * * Función para autentificar al usuario
   * @param {URL} url 
   * @param {String} token 
   * @param {HTMLElement} usuario 
   */
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
          // En caso de no tener una respuesta Ok
          logout();
        }
      })
      .then((datos) => {
        // Mostramos el email del usuario logeado
        if (datos != undefined) usuario.innerHTML = datos.email;
      });
  }

  /**
   * * Función para deslogear al usuario
   * Limpia la memoria y te dirige al inicio
   */
  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  /**
   * * Función para modificar el pedido
   */
  async function guardar() {
    // Constantes
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
        if (respuesta.ok) navigate('/Productos');
      })

    localStorage.clear();
  }

  /**
   * * Función para modificar el pedido
   */
  function eliminar() {
    // Constantes
    const productoLocal = JSON.parse(localStorage.getItem('producto'));
    const url = `http://localhost:5000/producto/delete/${productoLocal._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Productos');;
      })

    localStorage.clear();
  }

  /**
   * * Función para registrar un nuevo pedido
   */
  function insertar() {
    // Constantes
    const tipo = localStorage.getItem('tipo');
    const descripcionHTML = document.getElementById('descripcion');
    const aristaHTML = document.getElementById('arista');

    fetch('http://localhost:5000/producto/', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'tipo': tipo,
        'descripcion': descripcionHTML.value,
        'arista': aristaHTML.valueAsNumber
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Productos');
      })

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
                    <Link><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
                  </div>
                </div>
              </div>

              <div id="boton_guardar">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Guardar</p></div>
                  <div id="boton_imagen" onClick={guardar}>
                    <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                  </div>
                </div>
              </div>

              <div id="boton_nuevo">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Guardar</p></div>
                  <div id="boton_imagen" onClick={insertar}>
                    <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                  </div>
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