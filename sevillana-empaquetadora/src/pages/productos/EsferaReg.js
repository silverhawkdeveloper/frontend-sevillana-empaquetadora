import { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import esfera from '../../imagenes/figuras_geometricas/medidas_esfera.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
//import '../../css/pedidos_reg.css';

function EsferaReg() {

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');
    // Capturamos el contenedor del boton eliminar
    // Si hemos accedido desde nuevo empleado ocultamos el boton
    const boton_eliminar = document.getElementById('contenedor_boton_login_no')
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;
    const imagen = document.getElementById('imagen')
    let modificar_producto = localStorage.getItem('Modificar_producto');
    if (modificar_producto) {
      imagen.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos del producto';
    } else {
      boton_eliminar.style.display = 'none';
    }
  }, []);

  function guardar() {
    console.log('Entrando en la función Ok');
    localStorage.clear();
  }

  function eliminar() {
    console.log('Entrando en la función No');
    localStorage.clear();
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={cajas_blanco} alt="cajas_blanco" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >

      <div id="contenedor_blanco_duo">

        <div id="imagen">
          <img id="imagen_figura" src={esfera} alt="esfera" />
        </div>

        <div id="form">
          <div id="contenedor_texto"><h2>Mide la esfera</h2></div>

          <div id="contenedor_formulario">
            <form id="form_estrecho">
              <input id="descripcion" type="text" placeholder="Descripción" />
              <input id="circunferencia" type="text" placeholder="Circunferencia" />
            </form>
          </div>

          <div id="contenedor_botones">
            <div id="contenedor_boton_login_no">
              <div id="boton_texto"><p>Eliminar</p></div>
              <div id="boton_imagen" onClick={eliminar}>
                <Link to="/Productos"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
              </div>
            </div>

            <div id="contenedor_boton_login_ok">
              <div id="boton_texto"><p>Guardar</p></div>
              <div id="boton_imagen" onClick={guardar}>
                <Link to="/Productos"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EsferaReg;