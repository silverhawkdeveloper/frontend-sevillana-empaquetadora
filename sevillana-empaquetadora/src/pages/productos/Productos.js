import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import productos_blanco from '../../imagenes/iconos/productos_blanco.png';
import productos from '../../imagenes/iconos/productos+.png';
import boton_emer from '../../imagenes/iconos/boton-emergencia.png';
import '../../css/app.css';
import '../../css/productos/productos.css';

const Productos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = document.getElementById('usuario');
    const url_profile = 'http://localhost:5000/auth-token/profile';

    // Recuperamos el token almacenado en la sesion
    const token = sessionStorage.getItem('JWT');
    auth_token_profile(url_profile, token, usuario);

    const url_pedido = 'http://localhost:5000/pedido/';
    const tbody = document.getElementById('tbody');
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

  function url(evento) {
    console.log('Entrando en la función url');
    localStorage.setItem('Modificar_producto', true);
    let ruta;
    let figura = evento.currentTarget.parentElement.childNodes;
    figura.forEach(element => {
      if (element.id === 'tipo') {
        switch (element.innerText) {
          case 'Cubo':
            ruta = "/cubo_reg";
            break;
          case 'Ortoedro':
            ruta = "/ortoedro_reg";
            break;
          case 'Cilindro':
            ruta = "/cilindro_reg";
            break;
          case 'Esfera':
            ruta = "/esfera_reg";
            break;
          default:
            ruta = "/home";
        }
      };
    });
    navigate(ruta)
  }

  return (
    <div id='cntr'>
      <div id="cntr_negro">

        <div id="cntr_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={productos_blanco} alt="logo productos" />
        </div>

        <div id="cntr_usuario">
        <h4 id='usuario'> </h4>
          <button><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="cntr_blanco">

        <div id='cntr_productos'>

          <div id="cntr_nuevo_obj">
            <div id="boton_imagen">
              <Link to="/Figuras"><img id="iconos_btn" src={productos} alt="nuevo producto" /></Link>
            </div>
            <div id="boton_texto"><p>Nuevo producto</p></div>
          </div>

          <div id="cntr_gris_tabla">
            <table>
              <tbody>
                <tr>
                  <th>Descripción</th>
                  <th>Tipo</th>
                  <th>Medidas</th>
                  <th>Modificar</th>
                </tr>
                <tr>
                  <td id='descripcion'>Producto 1</td>
                  <td id='tipo'>Cubo</td>
                  <td id='medidas'>100x100x100</td>
                  <td onClick={url}>
                    <Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link>
                  </td>
                </tr>
                <tr>
                  <td id='descripcion'>Producto 2</td>
                  <td id='tipo'>Ortoedro</td>
                  <td id='medidas'>100x200x50</td>
                  <td onClick={url}>
                    <Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link>
                  </td>
                </tr>
                <tr>
                  <td id='descripcion'>Producto 3</td>
                  <td id='tipo'>Cilindro</td>
                  <td id='medidas'>25x230</td>
                  <td onClick={url}>
                    <Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link>
                  </td>
                </tr>
                <tr>
                  <td id='descripcion'>Producto 4 </td>
                  <td id='tipo'>Esfera</td>
                  <td id='medidas'>250</td>
                  <td onClick={url}>
                    <Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Productos