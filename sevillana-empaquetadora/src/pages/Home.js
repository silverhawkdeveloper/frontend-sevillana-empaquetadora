import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedididos from '../imagenes/iconos/pedidos.png';
import productos from '../imagenes/iconos/productos.png';
import cajas from '../imagenes/iconos/cajas.png';
import empleados from '../imagenes/iconos/empleados.png';
import '../css/app.css';
import '../css/menu.css';

const Home = () => {
  return (
    <>
      <div id="contenedor_negro">
        <div id="contenedor_logo">
          <Link to="/"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>
        <div id="contenedor_usuario">
          <h3>Usuario</h3>
          <h4>daniel@email.com</h4>
          <button className="boton_out"><Link className="boton_out" to="/">Sign out</Link></button>
        </div>
      </div>
      <div id="contenedor_blanco">
        <nav>
          <ul>
            <li className="boton"> <Link to="/Pedididos"><div id="cuadrado">
              <img className="iconos" src={pedididos} alt="logo pedididos" />
            </div>PEDIDOS</Link></li>
            <li className="boton"><Link to="/Productos"><div id="cuadrado">
              <img className="iconos" src={productos} alt="logo productos" />
            </div>PRODUCTOS</Link> </li>
            <li className="boton"><Link to="/Cajas"><div id="cuadrado">
              <img className="iconos" src={cajas} alt="logo cajas" />
            </div>CAJAS</Link></li>
            <li className="boton"><Link to="/Empleados"><div id="cuadrado">
              <img className="iconos" src={empleados} alt="logo empleados" />
            </div>EMPLEADOS</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Home;
