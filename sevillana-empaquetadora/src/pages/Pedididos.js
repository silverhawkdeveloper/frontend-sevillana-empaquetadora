import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedidos from '../imagenes/iconos/pedidos+.png';
import pedidos_blanco from '../imagenes/iconos/pedidos_blanco.png';
import '../css/app.css';
import '../css/menu.css';

const Pedididos = () => {
  return (
    <>
      <div id="contenedor_negro">
        <div id="contenedor_logo">
          <Link to="/"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img className="iconos_blanco" src={pedidos_blanco} alt="logo sevillana empaquetadora" />
        </div>
        <div id="contenedor_usuario">
          <h3>Usuario</h3>
          <h4>daniel@email.com</h4>
          <button className="boton_out"><Link className="boton_out" to="/">Sign out</Link></button>
        </div>
      </div>
      <div id="contenedor_blanco_2">
        <div id="contenedor_boton">
          <div id="boton_imagen">
           <Link to="/"><img className="iconos_btn" src={pedidos} alt="logo sevillana empaquetadora" /></Link>
          </div>
          <div id="boton_texto"><p>Nuevo pedido</p></div>
        </div>
        <div id="contenedor_contenido">
          <table>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Savings</th>
            </tr>
            <tr>
              <td>Peter</td>
              <td>Griffin</td>
              <td>$100</td>
            </tr>
            <tr>
              <td>Lois</td>
              <td>Griffin</td>
              <td>$150</td>
            </tr>
            <tr>
              <td>Joe</td>
              <td>Swanson</td>
              <td>$300</td>
            </tr>
            <tr>
              <td>Cleveland</td>
              <td>Brown</td>
              <td>$250</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Pedididos;
