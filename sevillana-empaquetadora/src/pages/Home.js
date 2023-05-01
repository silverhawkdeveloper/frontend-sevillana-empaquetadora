import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedididos from '../imagenes/iconos/pedidos.png';
import productos from '../imagenes/iconos/productos.png';
import cajas from '../imagenes/iconos/cajas.png';
import empleados from '../imagenes/iconos/empleados.png';
import '../css/home.css';
import '../css/menu.css';

const Home = () => {
  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco_home">
        <nav>
          <ul>
            <li id="boton"><Link to="/Pedidos"><div id="cuadrado">
              <img id="iconos" src={pedididos} alt="logo pedididos" />
            </div>PEDIDOS</Link></li>
            <li id="boton"><Link to="/Productos"><div id="cuadrado">
              <img id="iconos" src={productos} alt="logo productos" />
            </div>PRODUCTOS</Link> </li>
            <li id="boton"><Link to="/Cajas"><div id="cuadrado">
              <img id="iconos" src={cajas} alt="logo cajas" />
            </div>CAJAS</Link></li>
            <li id="boton"><Link to="/Empleados"><div id="cuadrado">
              <img id="iconos" src={empleados} alt="logo empleados" />
            </div>EMPLEADOS</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;
