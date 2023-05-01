import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import pedidos_plus from '../../imagenes/iconos/pedidos+.png';
import boton_emer from '../../imagenes/iconos/boton-emergencia.png';
import '../../css/app.css';


class Pedidos extends Component {
  componentDidMount() {
    // El código que deseas ejecutar después de cargar el contenido HTML debe estar aquí
    console.log('El contenido HTML se ha cargado');
  }

  render() {
    return (
      <div id='contenedor'>
        <div id="contenedor_negro">

          <div id="contenedor_logo">
            <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
            <img id="iconos_blanco" src={pedidos_blanco} alt="logo pedididos" />
          </div>

          <div id="contenedor_usuario">
            <h4>daniel@email.com</h4>
            <button><Link id="boton_out" to="/">Log out</Link></button>
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
              <tbody>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Merna</th>
                  <th>Realizado</th>
                  <th>Modificar</th>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Daniel</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
                <tr>
                  <td>05/12/2023</td>
                  <td>Producto X</td>
                  <td>100</td>
                  <td>23</td>
                  <td>Olsen</td>
                  <td><Link to="/Pedidos_mod"><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
};

export default Pedidos;