// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import { Chart } from 'chart.js/auto';
// CSS
import '../../css/app.css';
import '../../css/home.css';

const CajasGraf = () => {
  const navigate = useNavigate();

  /**
   * * Componente de React que entra una vez se ha cargado la página
   */
  useEffect(() => {
    // Constantes
    const usuario = document.getElementById('usuario');
    const url = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    mostrar_grafica();

  });

  /**
   * * Función para construir la gráfica
   */
  async function mostrar_grafica() {
    // Constantes
    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    // Recuperamos los pedidos
    const pedidos = await peticionPedidos();
    // Recuperamos las cajas
    const cajas = await peticionCajas();

    // Variables
    let array_pedidos = [];
    let array_caja = [];
    let contador = 0;

    cajas.forEach(caj => {
      array_caja.push(caj.descripcion);
      pedidos.forEach(ped => {
        if (caj._id === ped.caja[0]._id) {
          contador++;
        }
      })
      array_pedidos.push(contador);
      contador = 0;
    });

    // Objetos de las gráficas
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: array_caja,
        datasets: [{
          label: 'Cajas empleadas',
          data: array_pedidos,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: meses,
        datasets: datos_cajas()
      }
    });

    /**
     * * Función para conocer la merma de cada caja
     * @returns Devuelve un array con las mermas
     */
    function datos_cajas() {
      let array_caja2 = [];
      let mes = 0;
      cajas.forEach(caja => {
        let objeto = {
          label: '',
          data: '',
          borderWidth: 1
        }
        objeto.label = `Merma ${caja.descripcion}`;
        objeto.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        pedidos.forEach(ped => {
          if (caja._id === ped.caja[0]._id) {
            mes = (new Date(ped.fecha)).getMonth()
            objeto.data[mes] += ped.merma;
          }
        })
        array_caja2.push(objeto);
      });
      return array_caja2;
    }
  }

  /**
   * * Función para recuperar los pedidos
   * @returns Devuelve un array con lo pedidos
   */
  async function peticionPedidos() {
    const response = await fetch('http://localhost:5000/pedido/');
    const data = await response.json();
    return data;
  }

  /**
   * * Función para recuperar las cajas
   * @returns Devuelve un array con las cajas
   */
  async function peticionCajas() {
    const response = await fetch('http://localhost:5000/caja/');
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

  return (
    <div id="cntr">

      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
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

        <div className='cntr_grafica'>
          <div className='grafica'>
            <canvas id="myChart2" ></canvas>
          </div>
        </div>
        
      </div>

    </div>
  );
};

export default CajasGraf;