// React
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../imagenes/logo.png';
import flecha from '../imagenes/iconos/flecha.png';
// CSS
import '../css/login.css';
// Funciones
import { validarError } from '../js/funciones';
import { ruta } from '../index.js';

const Login = () => {
  const navigate = useNavigate();

  /**
   * * Constante para poder logearnos presionando enter
   * @param {Event} evento donde se ha hecho click
   */
  const pressEnter = (evento) => {
    if (evento.key === 'Enter') {
      login();
    } else {
      validarError(evento.currentTarget, 'Formato del email no válido');
    }
  };

  /**
   * * Función que permite hacer login
   */
  function login() {
    // Constantes
    const email = document.getElementById("email");
    const contrasenia = document.getElementById("contrasenia");
    const url = ruta + 'auth-token/login';

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email.value,
        contrasenia: contrasenia.value
      })
    })
      .then(response => {
        return response.text();
      })
      .then(datos => {
        // Si la respuesta es el JWT
        if (datos.includes('jwt')) {
          datos = JSON.parse(datos)
          sessionStorage.setItem('JWT', datos.jwt);
          navigate('/Home');
        } else {
          // Si la respuesta es unmensaje del servidor
          let objetoInput;
          datos.includes('email') ? objetoInput = email : objetoInput = contrasenia
          validarError(objetoInput, datos, 1);
        }
      })
  }

  return (
    <div id='cntr'>

      <div id="cntr_negro_login">
        <img id="logo" src={logo} alt="logo sevillana empaquetadora" />
      </div>

      <div id="cntr_blanco_login">

        <h1>BIENVENIDO</h1>

        <div id="cntr_formulario">
          <input id="email" type="email" placeholder="Email" onChange={pressEnter} onKeyDown={pressEnter}/>
          <input id="contrasenia" type="password" placeholder="Contraseña" onKeyDown={pressEnter} />
        </div>

        <div id="cntr_boton_login">
          <div id="boton_texto"><p>Log in</p></div>
          <div id="boton_imagen" onClick={() => login()}>
            <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
          </div>
        </div>

        <div id="errores">
          <span className="texto"></span>
        </div>

      </div>

    </div>
  );
};

export default Login;