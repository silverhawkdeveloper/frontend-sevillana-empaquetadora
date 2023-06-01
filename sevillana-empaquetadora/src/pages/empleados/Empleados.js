import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import empleados_blanco from '../../imagenes/iconos/empleados_blanco.png';
import empleados from '../../imagenes/iconos/empleados+.png';
import grafica from '../../imagenes/iconos/grafica.png';
import '../../css/app.css';
import '../../css/empleados/empleados.css';
import { obtener_id, construir_tabla_empleados }
  from '../../js/funciones.js'

const Empleados = () => {
  const navigate = useNavigate();
  localStorage.clear();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    const url_empleado = 'http://localhost:5000/usuario/';
    const tbody = document.getElementById('tbody');

    // Peticion para obtener los empleados
    fetch(url_empleado)
      .then(response => response.json())
      .then(data => {
        construir_tabla_empleados(data, tbody);
        const boton = document.getElementsByClassName('guardarpedido');

        Array.from(boton).forEach(link => {
          link.addEventListener('click', modificar_empleado)
        });
      })
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
        if (datos != undefined) usuario.innerHTML = datos.email;
      });
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function modificar_empleado(e) {
    const id = obtener_id(e);
    localStorage.setItem('modificar_empleado', true);
    fetch(`http://localhost:5000/usuario/${id}`)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('empleado', JSON.stringify(data));
        navigate('/empleados_reg');
      })
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

        <div id='cntr_productos'>

          <div id="cntr_botones">

            <Link id="cntr_nuevo_obj" to="/empleados_graf">
              <img id="iconos_btn" src={grafica} alt="graficas empleado" />
              <div id="boton_texto"><p>Gráficas</p></div>
            </Link>

            <Link id="cntr_nuevo_obj" to="/Empleados_reg">
              <div id="boton_imagen">
                <img id="iconos_btn" src={empleados} alt="nuevo empleado" />
              </div>
              <div id="boton_texto"><p>Nuevo empleado</p></div>
            </Link>

          </div>

          <div id="cntr_gris_tabla">

            <table>
              <tbody id='tbody'>
                <tr>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Teléfono</th>
                  <th>Modificar</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empleados;