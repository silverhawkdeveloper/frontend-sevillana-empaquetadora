// React
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
// Imagenes
import logo from '../../imagenes/logo.png';
import empleados_blanco from '../../imagenes/iconos/empleados_blanco.png';
import { Chart } from 'chart.js/auto';
// CSS
import '../../css/app.css';
import '../../css/home.css';
// Funciones
import { ruta } from '../../index.js';

const EmpleadosGraf = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    const usuario = document.getElementById('usuario');
    const url = ruta + 'auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url, token, usuario);

    mostrar_grafica();

  });

  async function mostrar_grafica() {
    // Recuperamos los pedidos
    const pedidos = await peticionPedidos();
    let array_pedidos = [];

    // Recuperamos los usuarios
    const usuarios = await peticionUsuarios();
    let array_usuario = [];

    let contador = 0;
    usuarios.forEach(us => {
      array_usuario.push(us.nombre);
      pedidos.forEach(ped => {
        if (us._id === ped.usuario[0]._id) {
          contador++;
        }
      })
      array_pedidos.push(contador);
      contador = 0;
    });

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: array_usuario,
        datasets: [{
          label: 'Número de pedidos',
          data: array_pedidos,
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Pedidos totales empaquetados'
          }
        }
      }
    });

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    function datos_empleados() {
      let array_usuario2 = [];
      let mes = 0;
      usuarios.forEach(us => {
        let objeto = {
          label: '',
          data: '',
          borderWidth: 1
        }
        objeto.label = us.nombre;
        objeto.data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        pedidos.forEach(ped => {
          if (us._id === ped.usuario[0]._id) {
            mes = (new Date(ped.fecha)).getMonth()
            objeto.data[mes] += 1;
          }
        })
        array_usuario2.push(objeto);
      });
      return array_usuario2;
    }

    const ctx2 = document.getElementById('myChart2');
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: meses,
        datasets: datos_empleados()
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Pedidos mensuales'
          }
        }
      }
    });
  }

  async function peticionPedidos() {
    const response = await fetch(ruta + 'pedido/');
    const data = await response.json();
    return data;
  }

  async function peticionUsuarios() {
    const response = await fetch(ruta + 'usuario/');
    const data = await response.json();
    return data;
  }

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

  return (
    <div id="cntr">

      <div id="cntr_negro">
        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <Link to="/Empleados"><img id="iconos_blanco" src={empleados_blanco} alt="logo sevillana empaquetadora" /></Link>
          <h4>Empleados</h4>
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

export default EmpleadosGraf;