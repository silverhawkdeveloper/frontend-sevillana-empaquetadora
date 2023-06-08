// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import empleados_blanco from '../../imagenes/iconos/empleados_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
// CSS
import '../../css/app.css';
import '../../css/empleados/empleados.css';
// Funciones
import { ruta } from '../../index.js';

const EmpleadosReg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url_profile = ruta + 'auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Capturamos el cntr del boton eliminar
    // Si hemos accedido desde nuevo ocultamos el boton
    const boton_eliminar = document.getElementById('boton_eliminar');
    const boton_guardar = document.getElementById('boton_guardar');
    const boton_nuevo = document.getElementById('boton_nuevo');
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;

    let modificar_empleado = localStorage.getItem('modificar_empleado');
    if (modificar_empleado) {
      boton_nuevo.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos del empleado';

      //Cargamos los datos locales
      const empleadoLocal = JSON.parse(localStorage.getItem('empleado'));

      const roleHTML = document.getElementById('rol');
      const nombreHTML = document.getElementById('nombre');
      const telefonoHTML = document.getElementById('telefono');
      const emailHTML = document.getElementById('email');
      const contaseniaHTML = document.getElementById('contasenia');

      roleHTML.value = empleadoLocal.role;
      nombreHTML.value = empleadoLocal.nombre;
      telefonoHTML.value = empleadoLocal.telefono;
      emailHTML.value = empleadoLocal.email;
      contaseniaHTML.value = empleadoLocal.contrasenia;

    } else {
      boton_eliminar.style.display = 'none';
      boton_guardar.style.display = 'none';
    }
  });

  function auth_token_profile(url, token, usuario) {
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
      .then(respuesta => {
        if (respuesta.ok) {
          return respuesta.json();
        } else {
          logout();
        }
      })
      .then((datos) => {
        // Mostramos el email del usuario logeado
        if (datos !== undefined) usuario.innerHTML = datos.email;
      });
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function guardar() {
    const empleadoLocal = JSON.parse(localStorage.getItem('empleado'));
    const roleHTML = document.getElementById('rol');
    const nombreHTML = document.getElementById('nombre');
    const telefonoHTML = document.getElementById('telefono');
    const emailHTML = document.getElementById('email');
    const contaseniaHTML = document.getElementById('contasenia');
    const url = `${ruta}usuario/update/${empleadoLocal._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'role': roleHTML.value,
        'nombre': nombreHTML.value,
        'telefono': telefonoHTML.value,
        'email': emailHTML.value,
        'contrasenia': contaseniaHTML.value
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Empleados');
      })

    localStorage.clear();
  }

  function eliminar() {
    const empleadoLocal = JSON.parse(localStorage.getItem('empleado'));
    const url = `${ruta}usuario/delete/${empleadoLocal._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Empleados');
      })

    localStorage.clear();
  }

  function insertar() {
    const roleHTML = document.getElementById('rol');
    const nombreHTML = document.getElementById('nombre');
    const telefonoHTML = document.getElementById('telefono');
    const emailHTML = document.getElementById('email');
    const contaseniaHTML = document.getElementById('contasenia');

    fetch(ruta + 'usuario/', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'role': roleHTML.value,
        'nombre': nombreHTML.value,
        'telefono': telefonoHTML.value,
        'email': emailHTML.value,
        'contrasenia': contaseniaHTML.value
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Empleados');
      })

    localStorage.clear();
  }
  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={empleados_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >

      <div id="cntr_blanco">

        <div id="cntr_empleados">
          <div id="form">
            <div id="contenedor_texto"><h2>Datos usuario</h2></div>

            <form id="form_ancho">
              <select id="rol">
                <option value={'admin'}>Administrador</option>
                <option value={'user'}>Usuario</option>
              </select>
              <input id="nombre" type="text" placeholder="Nombre" />
              <input id="telefono" type="text" placeholder="Teléfono" />
              <input id="email" type="text" placeholder="Email" />
              <input id="contasenia" type="password" placeholder="Contraseña" />
            </form>

            <div id="cntr_botones">

              <div id="boton_eliminar">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Eliminar</p></div>
                  <div id="boton_imagen" onClick={eliminar}>
                    <Link><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
                  </div>
                </div>
              </div>

              <div id="boton_guardar">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Guardar</p></div>
                  <div id="boton_imagen" onClick={guardar}>
                    <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                  </div>
                </div>
              </div>

              <div id="boton_nuevo">
                <div id="cntr_boton_login">
                  <div id="boton_texto"><p>Guardar</p></div>
                  <div id="boton_imagen" onClick={insertar}>
                    <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmpleadosReg;