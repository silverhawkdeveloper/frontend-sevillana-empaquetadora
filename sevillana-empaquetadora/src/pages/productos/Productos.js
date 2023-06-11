// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagen
import logo from '../../imagenes/logo.png';
import productos_blanco from '../../imagenes/iconos/productos_blanco.png';
import productos from '../../imagenes/iconos/productos+.png';
import grafica from '../../imagenes/iconos/grafica.png';
// CSS
import '../../css/app.css';
import '../../css/productos/productos.css';
// Funciones
import { obtener_id, construir_tabla_productos } from '../../js/funciones.js';
import { ruta } from '../../index.js';

const Productos = () => {
  const navigate = useNavigate();
  localStorage.clear();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url_profile = ruta + 'auth-token/profile';
    const url_producto = ruta + 'producto/';
    const tbody = document.getElementById('tbody');

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Peticion para obtener los productos
    fetch(url_producto)
      .then(response => response.json())
      .then(data => {
        construir_tabla_productos(data, tbody);
        const boton = document.getElementsByClassName('guardarpedido');

        Array.from(boton).forEach(link => {
          link.addEventListener('click', modificar_producto)
        });
      })
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
          // En caso de no tener una respuesta Ok
        } else {
          logout();
        }
      })
      .then((datos) => {
        // Mostramos el email del usuario logeado
        if (datos !== undefined) usuario.innerHTML = datos.email;
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
   * * Función para redirigirnos a la página de modificar el producto
   * @param {EventTarget} e 
   */
  function modificar_producto(e) {
    const id = obtener_id(e);
    let ruta_producto;
    localStorage.setItem('Modificar_producto', true);
    // Peticion para obtener un producto
    fetch(`${ruta}producto/${id}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('producto', JSON.stringify(data[0]));
        switch (data[0].tipo) {
          case 'Cubo':
            ruta_producto = "/cubo_reg";
            break;
          case 'Ortoedro':
            ruta_producto = "/ortoedro_reg";
            break;
          case 'Cilindro':
            ruta_producto = "/cilindro_reg";
            break;
          case 'Esfera':
            ruta_producto = "/esfera_reg";
            break;
          default:
            ruta_producto = "/home";
        }
        navigate(ruta_producto);
      })
  }

  return (
    <div id='cntr'>

      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={productos_blanco} alt="logo productos" />
          <h4>Productos</h4>
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="cntr_blanco">

        <div id='cntr_productos'>

          <div id="cntr_botones">

            <Link id="cntr_nuevo_obj" to="/productos_graf">
              <img id="iconos_btn" src={grafica} alt="graficas empleado" />
              <div id="boton_texto"><p>Gráficas</p></div>
            </Link>

            <Link id="cntr_nuevo_obj" to="/Figuras">
              <div id="boton_imagen">
                <img id="iconos_btn" src={productos} alt="nuevo producto" />
              </div>
              <div id="boton_texto"><p>Nuevo producto</p></div>
            </Link>

          </div>

          <div id="cntr_gris_tabla">
            <table>
              <tbody id='tbody'>
                <tr>
                  <th>Descripción</th>
                  <th>Tipo</th>
                  <th>Medidas</th>
                  <th>Modificar</th>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
export default Productos