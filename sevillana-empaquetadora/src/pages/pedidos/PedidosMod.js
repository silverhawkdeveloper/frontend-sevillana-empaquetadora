import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import pedidos_blanco from '../../imagenes/iconos/pedidos_blanco.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/app.css';

const PedidosMod = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');

    const usuario = document.getElementById('usuario');
    const url = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    //Cargar los datos local
    let pedido = JSON.parse(localStorage.getItem('pedido'));

    let _id = pedido._id;
    let fecha = document.getElementById('fecha');
    let producto = document.getElementById('producto');
    let cantidad = document.getElementById('cantidad');
    let merma = document.getElementById('merma');
    let realizado = document.getElementById('realizado');

    const fecha2 = new Date(pedido.fecha);
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fechaFormateada = fecha2.toLocaleDateString('es-ES', opciones);

    fecha.value = fechaFormateada;
    producto.value = pedido.producto;
    cantidad.value = pedido.cantidad;
    merma.value = pedido.merma;
    realizado.value = pedido.usuario;
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

  

  function ok() {
    console.log('Entrando en la función Ok');
    localStorage.clear();
  }

  function no() {
    console.log('Entrando en la función No');
    localStorage.clear();
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={pedidos_blanco} alt="logo pedididos" />
        </div>

        <div id="contenedor_usuario">
          <h4 id='usuario'> </h4>
          <button><Link id="boton_out" to="/">Sign out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco_empleados">

        <div id="contenedor_formulario_empleados">

          <div id="contenedor_texto"><h2>Datos pedido</h2></div>

          <form id="form_ancho">
            <input id="fecha" type="text" placeholder="Fecha" />
            <input id="producto" type="text" placeholder="Producto" />
            <input id="cantidad" type="text" placeholder="Cantidad" />
            <input id="merma" type="text" placeholder="Merma" />
            <input id="realizado" type="text" placeholder="Realizado" />
          </form>

          <div id="contenedor_botones">
            <div id="contenedor_boton_login">
              <div id="boton_texto"><p>Eliminar</p></div>
              <div id="boton_imagen" onClick={no}>
                <Link to="/Pedidos"><img id="iconos_btn" src={remove} alt="boton remove" /></Link>
              </div>
            </div>

            <div id="contenedor_boton_login">
              <div id="boton_texto"><p>Guardar</p></div>
              <div id="boton_imagen" onClick={ok}>
                <Link to="/Pedidos"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );

}

export default PedidosMod;