import { Outlet, Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedididos from '../imagenes/iconos/pedidos.png';
import flecha from '../imagenes/iconos/flecha.png';
import cajas from '../imagenes/iconos/cajas.png';
import empleados from '../imagenes/iconos/empleados.png';
import '../css/app.css';
import '../css/menu.css';

const Login = () => {
  return (
    <>
      <div id="contenedor_negro_2">
        <div id="contenedor_logo">
          <a><Link to="/"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link></a>
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
          <div id="boton_imagen">
            <a><Link to="/"><img className="iconos_btn" src={flecha} alt="boton flecha" /></Link></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
