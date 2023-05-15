import { Link, useNavigate } from "react-router-dom";
import logo from '../imagenes/logo.png';
import flecha from '../imagenes/iconos/flecha.png';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();

  function login() {
    console.log('Entrando en la función login');

    const email = document.getElementById("email");
    const contasenia = document.getElementById("contasenia");
    const url = 'http://localhost:5000/auth-token/login';
    let datos = {
      "email": "",
      "contrasenia": ""
    };
    datos.email = email.value;
    datos.contrasenia = contasenia.value;

    if (XMLHttpRequest) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let respuesta = xhr.responseText;
          respuesta = respuesta.replace(/{"jwt":"/, '').replace(/"}/, '');
          console.log(respuesta);
          sessionStorage.setItem('JWT', respuesta);
          navigate('/Home');
        }
      };
      xhr.open("POST", url);
      xhr.send(JSON.stringify(datos));
    }

  }

  return (
    <div id='contenedor'>

      <div id="contenedor_negro_login">
        <img id="logo" src={logo} alt="logo sevillana empaquetadora" />
      </div>

      <div id="contenedor_blanco_login">

        <h1>BIENVENIDO</h1>

        <div id="contenedor_formulario">
          <input id="email" type="text" placeholder="Email" />
          <input id="contasenia" type="text" placeholder="Contraseña" />
        </div>

        <div id="contenedor_boton_login">
          <div id="boton_texto"><p>Log in</p></div>
          <div id="boton_imagen" onClick={() => login()}>
            <Link ><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;
/*
    if (XMLHttpRequest) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let respuesta = xhr.responseText;
          respuesta = respuesta.replace(/{"jwt":"/, '').replace(/"}/, '');
          console.log(respuesta);
          sessionStorage.setItem('JWT', respuesta);
          navigate('/Home');
        }
      };
      xhr.open("POST", url);
      xhr.send(JSON.stringify(datos));
    }
*/