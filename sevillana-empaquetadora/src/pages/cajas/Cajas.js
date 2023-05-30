// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import cajas from '../../imagenes/iconos/cajas+.png';
import grafica from '../../imagenes/iconos/grafica.png';
// CSS
import '../../css/app.css';
import '../../css/cajas/cajas.css';
// Funciones
import { obtener_id, construir_tabla_cajas, auth_token_profile }
  from '../../js/funciones.js'

const Cajas = () => {
  const navigate = useNavigate();
  localStorage.clear();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';
    const url_producto = 'http://localhost:5000/caja/';
    const tbody = document.getElementById('tbody');

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Peticion para obtener las cajas
    fetch(url_producto)
      .then(response => response.json())
      .then(data => {
        construir_tabla_cajas(data, tbody);
        const boton = document.getElementsByClassName('guardarpedido');

        Array.from(boton).forEach(link => {
          link.addEventListener('click', modificar_caja)
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
        usuario.innerHTML = datos.email;
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
   * * Función para redirigirnos a la página de modificar caja
   * @param {EventTarget} e 
   */
  function modificar_caja(e) {
    const id = obtener_id(e);
    localStorage.setItem('modificar_caja', true);
    fetch(`http://localhost:5000/caja/${id}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('caja', JSON.stringify(data));
        navigate('/cajas_reg');
      })
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

      </div>

      <div id="cntr_blanco">
        <div id='cntr_productos'>

          <div id="cntr_botones">

            <div id="cntr_nuevo_obj">
              <Link to="/cajas_graf"><img id="iconos_btn" src={grafica} alt="graficas empleado" /></Link>
              <div id="boton_texto"><p>Gráficas</p></div>
            </div>

            <div id="cntr_nuevo_obj">
              <div id="boton_imagen">
                <Link to="/Cajas_reg"><img id="iconos_btn" src={cajas} alt="nueva caja" /></Link>
              </div>
              <div id="boton_texto"><p>Nueva caja</p></div>
            </div>

          </div>

          <div id="cntr_gris_tabla">

            <table>
              <tbody id='tbody'>
                <tr>
                  <th>Descripción</th>
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
};

export default Cajas;