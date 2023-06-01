//React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import cubo from '../../imagenes/figuras_geometricas/cubo.png';
import ortoedro from '../../imagenes/figuras_geometricas/ortoedro.png';
import cilindro from '../../imagenes/figuras_geometricas/cilindro.png';
import esfera from '../../imagenes/figuras_geometricas/esfera.png';
// CSS
import '../../css/app.css';
import '../../css/productos/figuras.css';

const Figuras = () => {
  const navigate = useNavigate();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);
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

  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="cntr_blanco">

        <div id="cntr_figuras">

          <h2>Elige la figura similar al producto</h2>

          <div id='cntr_figuras2'>

            <li id="boton"><Link to="/Cubo_reg"><div id="cuadrado">
              <img id="figuras" src={cubo} alt="cubo" />
            </div>CUBO</Link></li>

            <li id="boton"><Link to="/Ortoedro_reg"><div id="cuadrado">
              <img id="figuras" src={ortoedro} alt="ortoedro" />
            </div>ORTOEDRO</Link></li>

            <li id="boton"><Link to="/Cilindro_reg"><div id="cuadrado">
              <img id="figuras" src={cilindro} alt="cilindro" />
            </div>CILINDRO</Link></li>

            <li id="boton"><Link to="/Esfera_reg"><div id="cuadrado">
              <img id="figuras" src={esfera} alt="esfera" />
            </div>ESFERA</Link></li>

          </div>


        </div>

      </div>
    </div>
  );
};

export default Figuras;