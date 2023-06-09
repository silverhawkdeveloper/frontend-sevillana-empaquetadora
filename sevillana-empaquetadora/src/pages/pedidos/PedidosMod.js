// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
// CSS
import '../../css/app.css';
import '../../css/pedidos/pedidos_mod.css';
// Funciones
import { ruta } from '../../index.js';

const PedidosMod = () => {
  const navigate = useNavigate();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url = ruta + 'auth-token/profile';
    const fechaHTML = document.getElementById('fecha');
    const productoHTML = document.getElementById('producto');
    const cantidadHTML = document.getElementById('cantidad');
    const cajaHTML = document.getElementById('caja');
    const numero_cajasHTML = document.getElementById('numero_cajas');
    const mermaHTML = document.getElementById('merma');
    const usuarioHTML = document.getElementById('sel_usuario');
    // Cargamos los datos locales
    const pedidoLocal = JSON.parse(localStorage.getItem('pedido'));

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    // Formato de la fecha
    const fecha_res = new Date(pedidoLocal.fecha);
    const anio = fecha_res.getFullYear();
    const mes = String(fecha_res.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha_res.getDate()).padStart(2, '0');
    const fecha_form = `${anio}-${mes}-${dia}`;

    // Peticion para obtener el pedido
    fetch(`${ruta}pedido/${pedidoLocal._id}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(pedido => {
          numero_cajasHTML.value = pedido.numero_cajas;
        });
      })

    // Peticion para obtener los productos
    fetch(`${ruta}producto/`)
      .then(response => response.json())
      .then(data => {
        data.forEach(producto => {
          const a = producto._id
          const b = pedidoLocal.producto[0]
          const option = document.createElement('option');
          option.value = a;
          option.innerText = producto.descripcion;
          productoHTML.appendChild(option);
          if (a === b) option.setAttribute('selected', 'selected');
        });
      })

    // Peticion para obtener las cajas
    fetch(`${ruta}caja/`)
      .then(response => response.json())
      .then(data => {
        data.forEach(caja => {
          const a = caja._id;
          const b = pedidoLocal.caja[0];
          const option = document.createElement('option');
          option.value = a;
          option.innerText = caja.descripcion;
          cajaHTML.appendChild(option);
          if (a === b) option.setAttribute('selected', 'selected');
        });
      })

    // Peticion para obtener el usuario
    fetch(`${ruta}usuario/`)
      .then(response => response.json())
      .then(data => {
        data.forEach(usuario => {
          const a = usuario._id;
          const b = pedidoLocal.usuario[0];
          const option = document.createElement('option');
          option.value = a;
          option.innerText = usuario.email;
          usuarioHTML.appendChild(option);
          if (a === b) option.setAttribute('selected', 'selected');
        });
      })

    fechaHTML.value = fecha_form;
    cantidadHTML.value = pedidoLocal.cantidad;
    mermaHTML.value = pedidoLocal.merma;

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
        if (datos !== undefined) usuario.innerHTML = datos.email;
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
   * * Función para guardar la modificación del pedido
   */
  function guardar() {
    // Constantes
    const fechaHTML = document.getElementById('fecha');
    const productoHTML = document.getElementById('producto');
    const cajaHTML = document.getElementById('caja');
    const cantidadHTML = document.getElementById('cantidad');
    const mermaHTML = document.getElementById('merma');
    const usuarioHTML = document.getElementById('sel_usuario');

    const pedidoLocal = JSON.parse(localStorage.getItem('pedido'));
    const url = `${ruta}pedido/update/${pedidoLocal._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'usuario': usuarioHTML.value,
        'caja': cajaHTML.value,
        'producto': productoHTML.value,
        'cantidad': cantidadHTML.valueAsNumber,
        'merma': mermaHTML.valueAsNumber,
        'fecha': fechaHTML.valueAsDate
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          localStorage.clear();
          navigate('/Pedidos');
        }
      })
  }

  /**
   * * Función para eliminar el pedido
   */
  function eliminar() {
    // Constantes
    const pedidoLocal = JSON.parse(localStorage.getItem('pedido'));
    const url = `${ruta}pedido/delete/${pedidoLocal._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((respuesta) => {
        if (respuesta.ok) {
          localStorage.clear();
          navigate('/Pedidos');
        }
      })
  }

  return (
    <div id='cntr'>

      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <Link to="/Pedidos"><img id="iconos_blanco" src={pedidos_blanco} alt="logo pedidos" /></Link>
          <h4>Pedidos</h4>
        </div>

        <div id="cntr_usuario">
          <button><Link id="boton_out" to="/">Sign out</Link></button>
          <h4 id='usuario'> </h4>
        </div>

      </div>

      <div id="cntr_blanco">

        <div id='cntr_pedidos_mod'>

          <div id='cntr_gris_pedidos_mod'>

            <h2>Datos del pedido</h2>

            <div id='contenido_pedidos_mod'>

              <div id="columna_izq">
                <label>Fecha</label>
                <label>Producto</label>
                <label>Cantidad</label>
                <label>Caja</label>
                <label>Numero cajas</label>
                <label>Merma</label>
                <label>Realizado</label>
              </div>

              <div id="columna_der">
                <input id="fecha" type="date" />
                <select id="producto"></select>
                <input id="cantidad" type="number" min={1} />
                <select id="caja"></select>
                <input id="numero_cajas" type="number" min={1} />
                <input id="merma" type="number" min={1} />
                <select id="sel_usuario"></select>
              </div>

            </div>

            <div id="cntr_botones">

              <div id="cntr_boton_login">
                <div id="boton_texto"><p>Eliminar</p></div>
                <div id="boton_imagen" onClick={eliminar}>
                  <Link><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
                </div>
              </div>

              <div id="cntr_boton_login">
                <div id="boton_texto"><p>Guardar</p></div>
                <div id="boton_imagen" onClick={guardar}>
                  <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );

}

export default PedidosMod;