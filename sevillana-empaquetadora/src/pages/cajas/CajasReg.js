import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import caja from '../../imagenes/medidas_caja.png';
import flecha from '../../imagenes/iconos/flecha.png';
import remove from '../../imagenes/iconos/remove.png';
import '../../css/app.css';
import '../../css/cajas/cajas.css';

const CajasReg = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    // Capturamos el cntr del boton eliminar
    // Si hemos accedido desde nuevo ocultamos el boton
    const boton_eliminar = document.getElementById('boton_eliminar');
    const boton_guardar = document.getElementById('boton_guardar');
    const boton_nuevo = document.getElementById('boton_nuevo');
    const contenedor_texto = document.getElementById('contenedor_texto').firstChild;
    const imagen = document.getElementById('imagen')
    let modificar_caja = localStorage.getItem('modificar_caja');
    if (modificar_caja) {
      boton_nuevo.style.display = 'none';
      imagen.style.display = 'none';
      contenedor_texto.innerHTML = 'Datos de la caja';

      //Cargamos los datos locales
      const cajaLocal = JSON.parse(localStorage.getItem('caja'));

      const descripcionHTML = document.getElementById('descripcion');
      const altoHTML = document.getElementById('alto');
      const anchoHTML = document.getElementById('ancho');
      const profundoHTML = document.getElementById('profundo');

      descripcionHTML.value = cajaLocal.descripcion;
      altoHTML.value = cajaLocal.alto;
      anchoHTML.value = cajaLocal.ancho;
      profundoHTML.value = cajaLocal.profundo;

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
        usuario.innerHTML = datos.email;
      });
  }

  function logout() {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  }

  function guardar() {
    const cajaLocal = JSON.parse(localStorage.getItem('caja'));
    const descripcionHTML = document.getElementById('descripcion');
    const altoHTML = document.getElementById('alto');
    const anchoHTML = document.getElementById('ancho');
    const profundoHTML = document.getElementById('profundo');
    const url = `http://localhost:5000/caja/update/${cajaLocal._id}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'descripcion': descripcionHTML.value,
        'alto': altoHTML.valueAsNumber,
        'ancho': anchoHTML.valueAsNumber,
        'profundo': profundoHTML.valueAsNumber
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Cajas');
      })

    localStorage.clear();
  }

  function eliminar() {
    const cajaLocal = JSON.parse(localStorage.getItem('caja'));
    const url = `http://localhost:5000/caja/delete/${cajaLocal._id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Cajas');
      })

    localStorage.clear();
  }

  function insertar() {
    const descripcionHTML = document.getElementById('descripcion');
    const altoHTML = document.getElementById('alto');
    const anchoHTML = document.getElementById('ancho');
    const profundoHTML = document.getElementById('profundo');

    fetch('http://localhost:5000/caja/', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        'descripcion': descripcionHTML.value,
        'alto': altoHTML.valueAsNumber,
        'ancho': anchoHTML.valueAsNumber,
        'profundo': profundoHTML.valueAsNumber
      }),
    })
      .then((respuesta) => {
        if (respuesta.ok) navigate('/Cajas');
      })

    localStorage.clear();
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

        <div id="cntr_duo">

          <div id="imagen">
            <img id="imagen_figura" src={caja} alt="logo sevillana empaquetadora" />
          </div>

          <div id="form">
            <div id="contenedor_texto"><h2>Mide la caja</h2></div>

            <div id="contenedor_formulario">
              <form id="form_estrecho">
                <input id="descripcion" type="text" placeholder="Descripción" />
                <input id="alto" type="number" min={1} placeholder="Alto" />
                <input id="ancho" type="number" min={1} placeholder="Ancho" />
                <input id="profundo" type="number" min={1} placeholder="Profundo" />
              </form>
            </div>

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

export default CajasReg;