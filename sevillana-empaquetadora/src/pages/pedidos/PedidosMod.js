import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/app.css';

class PedidosMod extends Component {
  componentDidMount() {
    // El código que deseas ejecutar después de cargar el contenido HTML debe estar aquí
    console.log('El contenido HTML se ha cargado');
  }

  Ok() {
    console.log('Entrando en la función Ok');
  }

  No() {
    console.log('Entrando en la función No');
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
            <button><Link id="boton_out" to="/">Sign out</Link></button>
          </div>

        </div>

        <div id="contenedor_blanco_empleados">

          <div id="contenedor_formulario_empleados">

            <div id="contenedor_texto"><h2>Datos pedido</h2></div>

            <form id="form_ancho">
              <input id="fecha" type="text" placeholder="Fecha" />
              <input id="producto" type="text" placeholder="Producto" />
              <input id="cantidad" type="text" placeholder="Cantidad" />
              <input id="merma" type="text" placeholder="Merma" />
              <input id="realizado" type="text" placeholder="Realizado" />
            </form>

            <div id="contenedor_botones">
              <div id="contenedor_boton_login">
                <div id="boton_texto"><p>Eliminar</p></div>
                <div id="boton_imagen" onClick={this.No}>
                  <Link to="/Pedidos"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
                </div>
              </div>

              <div id="contenedor_boton_login">
                <div id="boton_texto"><p>Guardar</p></div>
                <div id="boton_imagen" onClick={this.Ok}>
                  <Link to="/Pedidos"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
    
  }
}

export default PedidosMod;