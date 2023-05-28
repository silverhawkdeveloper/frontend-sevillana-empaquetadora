// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import pedidos_plus from '../../imagenes/iconos/pedidos+.png';
import grafica from '../../imagenes/iconos/grafica.png';
import down from '../../imagenes/iconos/down.png';
// CSS
import '../../css/app.css';
import '../../css/pedidos/pedidos.css';
// Funciones
import { obtener_id, construir_tabla_pedidos }
  from '../../js/funciones.js'

const Pedidos = () => {
  const navigate = useNavigate();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';
    const url_pedido = 'http://localhost:5000/pedido/';
    const tbody = document.getElementById('tbody');

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Peticion para obtener los pedidos
    fetch(url_pedido)
      .then(response => response.json())
      .then(data => {
        construir_tabla_pedidos(data, tbody);
        // Evento para capturar el click en el boton
        const boton = document.getElementsByClassName('guardarpedido');
        Array.from(boton).forEach(link => {
          link.addEventListener('click', modificarpedido)
        });
      })
      .catch(error => {
        console.error('Error al realizar la petición:', error);
      });
  });

  /**
   * * Función para autentificar al usuario
   * @param {URL} url 
   * @param {String} token 
   * @param {HTMLElement} usuario 
   */
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
          // En caso de no tener una respuesta Ok
        } else {
          logout();
        }
      })
      .then((datos) => {
        // Mostramos el email del usuario logeado
        usuario.innerHTML = datos.email;
      });
  }

  /**
   * * Función para deslogear al usuario
   * Limpia la memoria y te dirige al inicio
   */
  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  /**
   * * Función para redirigirnos a la página de modificar pedido
   * @param {EventTarget} e 
   */
  function modificarpedido(e) {
    // Constantes
    const id = obtener_id(e);
    // Peticion para obtener un pedido
    fetch(`http://localhost:5000/pedido/${id}`)
      .then(response => response.json())
      .then(data => {
        // Almacenamos el pedidio de forma local y nos dirigimo a la página
        localStorage.setItem('pedido', JSON.stringify(data[0]));
        navigate('/Pedidos_mod');
      })
  }

  /**
   * * Función para ordenar la tabla
   * @param {EventTarget} index 
   */
  function ordenarTabla(index) {
    // Constantes
    const table = document.getElementById("tabla_pedidos");
    // Variables
    let rows, bandera = true, i, x, y, n, cambiar, dir, contador = 0;

    // Determina el valor a n según donde se haga click
    switch (index.currentTarget.textContent) {
      case 'Fecha':
        n = 0;
        break;
      case 'Caja':
        n = 1;
        break;
      default:
        break;
    }

    // Dirección de clasificación ascendente
    dir = "asc";

    while (bandera) {
      // No se realiza ningún cambio
      bandera = false;
      rows = table.rows;
      // Recorre todas las filas de la tabla excepto el encabezado
      for (i = 1; i < (rows.length - 1); i++) {
        // Comience diciendo que no debería haber cambios
        cambiar = false;
        // Los dos elementos para comparar, uno de la fila actual y uno de la siguiente
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir === "asc") {
          // Comprobamos las dos filas
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // Cambiamos el orden
            cambiar = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // Cambiamos el orden
            cambiar = true;
            break;
          }
        }
      }
      if (cambiar) {
        // Hacemos el cambio y activamos la bandera
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        bandera = true;
        contador++;
      } else {
        // Cambiamos la dirección
        if (contador === 0 && dir === "asc") {
          dir = "desc";
          bandera = true;
        }
      }
    }
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

          <div id="cntr_botones">

            <div id="cntr_nuevo_obj">
              <Link to="/pedidos_graf"><img id="iconos_btn" src={grafica} alt="graficas empleado" /></Link>
              <div id="boton_texto"><p>Gráficas</p></div>
            </div>

            <div id="cntr_nuevo_obj">
              <div id="boton_imagen">
                <Link to="/Pedidos_reg"><img id="iconos_btn" src={pedidos_plus} alt="logo pedidos_plus" /></Link>
              </div>
              <div id="boton_texto"><p>Nuevo pedido</p></div>
            </div>

          </div>

          <div id="cntr_gris_tabla">

            <table id='tabla_pedidos'>
              <tbody id='tbody'>
                <tr>
                  <th className='cabecera' onClick={ordenarTabla}>Fecha<img className='down' src={down} alt='down'></img></th>
                  <th>Producto</th>
                  <th className='cabecera' onClick={ordenarTabla}>Caja<img className='down' src={down} alt='down'></img></th>
                  <th>Merma cm³</th>
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