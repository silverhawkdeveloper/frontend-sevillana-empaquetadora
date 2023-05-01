import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import '../../css/duo.css';

class PedidosReg extends Component {
  componentDidMount() {
    // El código que deseas ejecutar después de cargar el contenido HTML debe estar aquí
    console.log('El contenido HTML se ha cargado');
  }

  Ok() {
    console.log('Entrando en la función Ok');
  }

  render() {
    return (
      <div id='contenedor'>
        <div id="contenedor_negro">

          <div id="contenedor_logo">
            <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
            <img id="iconos_blanco" src={cajas_blanco} alt="logo sevillana empaquetadora" />
          </div>

          <div id="contenedor_usuario">
            <h4>daniel@email.com</h4>
            <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
          </div>

        </div >

        <div id="contenedor_blanco_duo">

          <div id="form">

            <div id="contenedor_formulario_datos">
              <form id="form_estrecho_resultado">

                <div id="columna1">
                  <label>Caja</label>
                  <label>Número</label>
                  <label>Merma</label>
                </div>

                <div id="columna2">
                  <input id="caja" type="text" value={''} readOnly />
                  <input id="numero" type="text" value={''} readOnly />
                  <input id="merma" type="text" value={''} readOnly />
                </div>

              </form>
            </div>

          </div>

          <div id="form">
            <div id="contenedor_texto"><h2>Indica el pedido</h2></div>

            <div id="contenedor_formulario">
              <form id="form_estrecho">
                <select id="producto">
                  <option value={'x'}>Ejemplo 1</option>
                  <option value={'y'}>Ejemplo 2</option>
                </select>
                <input id="cantidad" type="text" placeholder="Cantidad" />
              </form>
            </div>

            <div id="contenedor_boton_login">
              <div id="boton_texto"><p>Enviar</p></div>
              <div id="boton_imagen" onClick={this.Ok}>
                <Link to="/Pedidos_reg"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default PedidosReg;

/*
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
*/