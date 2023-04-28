import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import flecha from '../imagenes/iconos/flecha.png';
import '../css/app.css';
import '../css/menu.css';

const Login = () => {

  function Sing() {
    console.log('Entrando en la función fetch');
    const email = document.getElementById("email");
    const contasenia = document.getElementById("contasenia");

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
          console.log(respuesta);
        }
      };
      xhr.open("POST", "http://localhost:5000/auth/autenticado");
      xhr.send(JSON.stringify(datos));
    }
  }

  return (
    <>
      <div id="contenedor_negro_2">
        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>
      </div>
      <div id="contenedor_blanco_login">
        <div id="contenedor_texto"><h1>BIENVENIDO</h1></div>
        <div id="contenedor_formulario">
          <form>
            <input id="email" type="text" placeholder="Email" />
            <input id="contasenia" type="text" placeholder="Contraseña" />
          </form>
        </div>
        <div id="contenedor_boton_2">
          <div id="boton_texto"><p>Sign in</p></div>
          <div id="boton_imagen" onClick={() => Sing()}>
            <Link to="/"><img className="iconos_btn" src={flecha} alt="boton flecha" /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
