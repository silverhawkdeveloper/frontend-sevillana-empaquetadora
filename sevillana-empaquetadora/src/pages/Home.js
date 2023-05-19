import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedididos from '../imagenes/iconos/pedidos.png';
import productos from '../imagenes/iconos/productos.png';
import cajas from '../imagenes/iconos/cajas.png';
import empleados from '../imagenes/iconos/empleados.png';

import '../css/app.css';
import '../css/home.css';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    const usuario = document.getElementById('usuario');
    const url = 'http://localhost:5000/auth-token/profile';
    const li_pedidos = document.getElementById('li_pedidos');
    const li_productos = document.getElementById('li_productos');
    const li_cajas = document.getElementById('li_cajas');
    const li_empleados = document.getElementById('li_empleados');

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario, li_pedidos, li_productos, li_cajas, li_empleados);

  });

  function auth_token_profile(url, token, usuario, div1, div2, div3, div4) {
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
        if (datos.role === 'user') {
          div1.style.display = 'block';
          div2.style.display = 'block';
        } else {
          div1.style.display = 'block';
          div2.style.display = 'block';
          div3.style.display = 'block';
          div4.style.display = 'block';
        }
      });
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  return (
    <div id="cntr">

      <div id="cntr_negro">
        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button onClick={() => logout()}><Link id="boton_out" to="/">Log out</Link></button>
        </div>
      </div>

      <div id="cntr_blanco">

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

      </div>

    </div>
  );
};

export default Home;