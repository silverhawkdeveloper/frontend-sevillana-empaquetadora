import { useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import empleados_blanco from '../../imagenes/iconos/empleados_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/login.css';

function EmpleadosReg() {

  useEffect(() => {
    // El código que deseas ejecutar después de cargar el contenido HTML
    console.log('El contenido HTML se ha cargado');
    // Capturamos el contenedor del boton eliminar
    // Si hemos accedido desde nuevo empleado ocultamos el boton
    const boton_eliminar = document.getElementById('contenedor_boton_login_no')
    let modificar_empleado = localStorage.getItem('Modificar_empleado');
    if (!modificar_empleado) {
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
          <img id="iconos_blanco" src={empleados_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >

      <div id="contenedor_blanco_empleados">

        <div id="contenedor_formulario_empleados">

          <div id="contenedor_texto"><h2>Datos usuario</h2></div>

          <form id="form_ancho">
            <select id="rol">
              <option value={'admin'}>Administrador</option>
              <option value={'user'}>Usuario</option>
            </select>
            <input id="nombre" type="text" placeholder="Nombre" />
            <input id="telefono" type="text" placeholder="Teléfono" />
            <input id="email" type="text" placeholder="Email" />
            <input id="contasenia" type="text" placeholder="Contraseña" />
          </form>

          <div id="contenedor_botones">
            <div id="contenedor_boton_login_no">
              <div id="boton_texto"><p>Eliminar</p></div>
              <div id="boton_imagen" onClick={eliminar}>
                <Link to="/Empleados"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
              </div>
            </div>

            <div id="contenedor_boton_login_ok">
              <div id="boton_texto"><p>Guardar</p></div>
              <div id="boton_imagen" onClick={guardar}>
                <Link to="/Empleados"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EmpleadosReg;