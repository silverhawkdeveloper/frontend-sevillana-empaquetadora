import { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import caja from '../../imagenes/medidas_caja.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
//import '../../css/pedidos_reg.css';

function CajasReg() {

  useEffect(() => {
    // El código que deseas ejecutar después de cargar el contenido HTML
    console.log('El contenido HTML se ha cargado');
    // Capturamos el contenedor del boton eliminar
    // Si hemos accedido desde nuevo empleado ocultamos el boton
    const boton_eliminar = document.getElementById('contenedor_boton_login_no')
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;
    const imagen = document.getElementById('imagen')
    let modificar_caja = localStorage.getItem('Modificar_caja');
    if (modificar_caja) {
      imagen.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos del producto';
    } else {
      boton_eliminar.style.display = 'none';
    }

  }, []);

  function guardar() {
    console.log('Entrando en la función guardar');
    localStorage.clear();
  }

  function eliminar() {
    console.log('Entrando en la función eliminar');
    localStorage.clear();
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
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
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

          <div id="contenedor_botones">
            <div id="contenedor_boton_login_no">
              <div id="boton_texto"><p>Eliminar</p></div>
              <div id="boton_imagen" onClick={eliminar}>
                <Link to="/Cajas"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
              </div>
            </div>

            <div id="contenedor_boton_login_ok">
              <div id="boton_texto"><p>Guardar</p></div>
              <div id="boton_imagen" onClick={guardar}>
                <Link to="/Cajas"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CajasReg;