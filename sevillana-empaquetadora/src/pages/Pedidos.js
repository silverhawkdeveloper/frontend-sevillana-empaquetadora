import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import pedidos_blanco from '../imagenes/iconos/pedidos_blanco.png';
import pedidos_plus from '../imagenes/iconos/pedidos+.png';
import '../css/app.css';

const Pedidos = () => {
  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={pedidos_blanco} alt="logo pedididos" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button><Link id="boton_out" to="/">Sign out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco">
        <div id="contenedor_boton">

          <div id="boton_imagen">
            <Link to="/Pedidos_reg"><img id="iconos_btn" src={pedidos_plus} alt="logo pedidos_plus" /></Link>
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
    </div>
  );
};

export default Pedidos;