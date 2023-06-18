// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import productos_blanco from '../../imagenes/iconos/productos_blanco.png';
import logo from '../../imagenes/logo.png';
import { Chart } from 'chart.js/auto';
// CSS
import '../../css/app.css';
import '../../css/home.css';
// Funciones
import { ruta } from '../../index.js';

const ProductosGraf = () => {
  const navigate = useNavigate();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    // La función que deseas ejecutar al montar el componente
    const usuario = document.getElementById('usuario');
    const url = ruta + 'auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    mostrar_grafica();

  });

  /**
   * * Función para mostrar las graficas
   */
  async function mostrar_grafica() {
    // Constantes
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // Recuperamos los pedidos
    const pedidos = await peticionPedidos();
    // Recuperamos los productos
    const productos = await peticionProductos();

    // Gráfica
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: meses,
        datasets: datos_productos()
      }
    });

    /**
     * * Función para construir un array
     * @returns Devuelve un array con los pedidos
     */
    function datos_productos() {
      let array = [];
      let mes = 0;
      productos.forEach(prod => {
        let objeto = {
          label: '',
          data: '',
          borderWidth: 1
        }
        objeto.label = prod.descripcion;
        objeto.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        pedidos.forEach(ped => {
          if (prod._id === ped.producto[0]._id) {
            mes = (new Date(ped.fecha)).getMonth()
            objeto.data[mes] += ped.cantidad;
          }
        });
        array.push(objeto);
      });
      return array;
    }
  }

  /**
   * Función de una petición fetch
   * @returns Devuelve los pedidios
   */
  async function peticionPedidos() {
    const response = await fetch(ruta + 'pedido/');
    const data = await response.json();
    return data;
  }

  /**
   * Función de una petición fetch
   * @returns Devuelve los pedidios
   */
  async function peticionProductos() {
    const response = await fetch(ruta + 'producto/');
    const data = await response.json();
    return data;
  }

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

  return (
    <div id="cntr">

      <div id="cntr_negro">
        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <Link to="/Productos"><img id="iconos_blanco" src={productos_blanco} alt="logo productos" /></Link>
          <h4>Productos</h4>
        </div>

        <div id="cntr_usuario">
          <h4 id='usuario'> </h4>
          <button onClick={() => logout()}><Link id="boton_out" to="/">Log out</Link></button>
        </div>
      </div>

      <div id="cntr_blanco">

        <div className='cntr_grafica'>
          <div className='grafica'>
            <canvas id="myChart" ></canvas>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default ProductosGraf;