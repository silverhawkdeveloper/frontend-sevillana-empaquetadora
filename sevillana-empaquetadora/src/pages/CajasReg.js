import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import cajas_blanco from '../imagenes/iconos/cajas_blanco.png';
import caja from '../imagenes/medidas_caja.png';
import flecha from '../imagenes/iconos/flecha.png';
import '../css/duo.css';

const CajasReg = () => {

  function Sing() {
    console.log('Entrando en la función fetch');
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
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={cajas_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Sign out</Link></button>
        </div>

      </div >

      <div id="contenedor_blanco_duo">

        <div id="imagen">
          <img id="imagen_figura" src={caja} alt="logo sevillana empaquetadora" />
        </div>

        <div id="form">
          <div id="contenedor_texto"><h2>Mide la caja</h2></div>

          <div id="contenedor_formulario">
            <form id="form_estrecho">
              <input id="descripcion" type="text" placeholder="Descripción" />
              <input id="alto" type="text" placeholder="Alto" />
              <input id="acho" type="text" placeholder="Ancho" />
              <input id="profundo" type="text" placeholder="Profundo" />
            </form>
          </div>

          <div id="contenedor_boton_login">
            <div id="boton_texto"><p>Guardar</p></div>
            <div id="boton_imagen" onClick={() => Sing()}>
              <Link to="/"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CajasReg;