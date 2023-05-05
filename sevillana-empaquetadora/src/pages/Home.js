import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedididos from '../imagenes/iconos/pedidos.png';
import productos from '../imagenes/iconos/productos.png';
import cajas from '../imagenes/iconos/cajas.png';
import empleados from '../imagenes/iconos/empleados.png';
import '../css/home.css';
import '../css/menu.css';
import { auth_token_profile } from '../js/funciones.js'

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');

    const li_cajas = document.getElementById('li_cajas');
    const li_empleados = document.getElementById('li_empleados');
    const usuario = document.getElementById('usuario');
    const url = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    let token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario, li_cajas, li_empleados);

  }, []);

  function logout() {
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>

        <div id="contenedor_usuario">
          <h4 id='usuario'> </h4>
          <button onClick={() => logout()}><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco_home">
        <nav>
          <ul>
            <li id="li_pedidos"><Link to="/Pedidos"><div id="cuadrado">
              <img id="iconos" src={pedididos} alt="logo pedididos" />
            </div>PEDIDOS</Link></li>
            <li id="li_productos"><Link to="/Productos"><div id="cuadrado">
              <img id="iconos" src={productos} alt="logo productos" />
            </div>PRODUCTOS</Link> </li>
            <li id="li_cajas"><Link to="/Cajas"><div id="cuadrado">
              <img id="iconos" src={cajas} alt="logo cajas" />
            </div>CAJAS</Link></li>
            <li id="li_empleados"><Link to="/Empleados"><div id="cuadrado">
              <img id="iconos" src={empleados} alt="logo empleados" />
            </div>EMPLEADOS</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;