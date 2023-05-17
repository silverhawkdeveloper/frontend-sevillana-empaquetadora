import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import pedidos_plus from '../../imagenes/iconos/pedidos+.png';
import '../../css/app.css';
import '../../css/pedidos.css';
import { obtener_id, crear_pedido, construir_tabla_pedidos }
  from '../../js/funciones.js'

const Pedidos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('El contenido HTML de Pedidos se ha cargado');

    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    const url_pedido = 'http://localhost:5000/pedido/';
    const tbody = document.getElementById('tbody');

    // Peticion para obtener los pedidos
    fetch(url_pedido)
      .then(response => response.json())
      .then(data => {
        // Almacenar los datos en una variable
        const datosRecibidos = data;

        // Pasar por un condicional del resultado
        if (datosRecibidos.length > 0) {
          console.log('Se recibieron datos');
          construir_tabla_pedidos(datosRecibidos, tbody)
          const boton = document.getElementsByClassName('guardarpedido');

          Array.from(boton).forEach(link => {
            link.addEventListener('click', modificarpedido)
          });

        } else {
          console.log('No se recibieron datos');
        }
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error);
      });

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
        usuario.innerHTML = datos.email;
      });
  }

  function logout() {
    console.log('Entrando en la función logout');
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function modificarpedido(e) {
    console.log('Entrando en la función modificarpedido');
    const id = obtener_id(e);

    // Peticion para obtener un pedido
    fetch(`http://localhost:5000/pedido/${id}`)
      .then(response => response.json())
      .then(data => {
        // Almacenar los datos en una variable
        const datosRecibidos = data;

        // Pasar por un condicional del resultado
        if (datosRecibidos.length > 0) {
          console.log('Se recibieron datos');
          localStorage.setItem('pedido', crear_pedido(datosRecibidos));
          navigate('/Pedidos_mod');
        } else {
          console.log('No se recibieron datos');
        }
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error);
      });

  }

  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={pedidos_blanco} alt="logo pedididos" />
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button onClick={() => logout()}><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="cntr_blanco">
        <div id='cntr_pedidos'>

          <div id="cntr_nuevo_obj">
            <div id="boton_imagen">
              <Link to="/Pedidos_reg"><img id="iconos_btn" src={pedidos_plus} alt="logo pedidos_plus" /></Link>
            </div>
            <div id="boton_texto"><p>Nuevo pedido</p></div>
          </div>

          <div id="cntr_gris_tabla">
            <table>
              <tbody id='tbody'>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Merna</th>
                  <th>Realizado</th>
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

export default Pedidos;