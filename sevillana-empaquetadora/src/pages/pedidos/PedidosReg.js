import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/app.css';
import '../../css/pedidos/pedidos_reg.css';
import { empaquetar } from '../../logica/app.js';
import { Pedido } from '../../logica/modelo-pedido';

const PedidosReg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    const productoHTML = document.getElementById('producto');
    const nodos_hijos = productoHTML.childNodes

    fetch('http://localhost:5000/producto/', {
      method: 'GET'
    })
      .then(respuesta => {
        if (respuesta.ok) return respuesta.json();
      })
      .then((datos) => {
        // Si exinten nodos de productos no los volvemos a escribir
        if (nodos_hijos != null & nodos_hijos.length === 0) {
          datos.forEach(producto => {
            const a = producto._id
            const option = document.createElement('option');
            option.value = a;
            option.innerText = producto.descripcion;
            productoHTML.appendChild(option);
          });
        }
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
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  async function peticionCajas() {
    const response = await fetch('http://localhost:5000/caja/');
    const data = await response.json();
    return data;
  }

  async function peticionProducto(id) {
    const response = await fetch(`http://localhost:5000/producto/${id}`);
    const data = await response.json();
    return data[0];
  }

  async function comprobar_ped() {
    const cajas = await peticionCajas();
    const fecha = new Date();
    const producto_ped = await peticionProducto(document.getElementById('producto').value);
    const cantidad_ped = document.getElementById('cantidad').valueAsNumber;
    const pedido = new Pedido(fecha, producto_ped, cantidad_ped);
    let resultado = empaquetar(pedido, cajas);

    //Mostramos el resultado en la pantalla
    const caja = document.getElementById('caja');
    const numero = document.getElementById('numero');
    const merma = document.getElementById('merma');

    caja.value = resultado.caja;
    numero.value = resultado.numero_cajas;
    merma.value = resultado.merma;

    // Almacenamos el pedido de forma local
    let pedido_local = {
      'usuario': '',
      'caja': resultado._id,
      'cajas_numero': resultado.numero_cajas,
      'producto': pedido.producto._id,
      'cantidad': pedido.cantidad,
      'merma': resultado.merma,
      'fecha': pedido.fecha
    }
    localStorage.setItem('pedido_local', JSON.stringify(pedido_local));
  }

  async function usuario(token) {
    const response = await fetch('http://localhost:5000/auth-token/profile', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    return data;
  }

  async function guardar() {
    const token = sessionStorage.getItem('JWT');
    const usuario_local = await usuario(token);
    const pedido = JSON.parse(localStorage.getItem('pedido_local'));
    const fecha = new Date();
    fetch('http://localhost:5000/pedido/', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'usuario': usuario_local._id,
        'caja': pedido.caja,
        'numero_cajas': pedido.cajas_numero,
        'producto': pedido.producto,
        'cantidad': pedido.cantidad,
        'merma': pedido.merma,
        'fecha': fecha
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) return respuesta;
      })
      .then((datos) => {
        navigate('/Pedidos');
      });

    localStorage.clear();
  }

  function cancelar() {
    localStorage.clear();
    navigate('/Pedidos');
  }

  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={cajas_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >

      <div id="cntr_blanco">

        <div id='cntr_pedidos_reg'>

          <div id="form">
            <h2>Indica producto y cantidad</h2>

            <form id="form_estrecho">
              <select id="producto"></select>
              <input id="cantidad" type="number" min={1} defaultValue={1} placeholder="Cantidad" />
            </form>


            <div id="cntr_boton_login">
              <div id="boton_texto"><p>Enviar</p></div>
              <div id="boton_imagen" onClick={comprobar_ped}>
                <Link><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>

          <div id="form">
            <h2>Resultado del empaquetado</h2>

            <form id="form_resultado">

              <div id="columna1">
                <label>Caja</label>
                <label>Número</label>
                <label>Merma cm³</label>
              </div>

              <div id="columna2">
                <input id="caja" type="text" value={''} readOnly />
                <input id="numero" type="text" value={''} readOnly />
                <input id="merma" type="text" value={''} readOnly />
              </div>

            </form>


            <div id="cntr_botones">
              <div id="cntr_boton_login">
                <div id="boton_texto"><p>Cancelar</p></div>
                <div id="boton_imagen" onClick={cancelar}>
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
};

export default PedidosReg;