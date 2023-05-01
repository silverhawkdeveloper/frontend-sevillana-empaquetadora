import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import cajas_blanco from '../../imagenes/iconos/cajas_blanco.png';
import cajas from '../../imagenes/iconos/cajas+.png';
import boton_emer from '../../imagenes/iconos/boton-emergencia.png';
import '../../css/app.css';

function Cajas() {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');
  }, []);

  function modificar_caja() {
    console.log('Entrando en la función modificar_caja');
    localStorage.setItem('Modificar_caja', true);
    navigate('/cajas_reg');
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={cajas_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco">
        <div id="contenedor_boton">

          <div id="boton_imagen">
            <Link to={'/Cajas_reg'}><img id="iconos_btn" src={cajas} alt="logo sevillana empaquetadora" /></Link>
          </div>
          <div id="boton_texto"><p>Nueva caja</p></div>

        </div>

        <div id="contenedor_contenido">

          <table>
            <tbody>
              <tr>
                <th>Descripción</th>
                <th>Medidas</th>
                <th>Modificar</th>
              </tr>
              <tr>
                <td>Caja 1</td>
                <td>100x100x100</td>
                <td onClick={modificar_caja}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>Caja 2</td>
                <td>150x100x100</td>
                <td onClick={modificar_caja}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>Caja 3</td>
                <td>300x200x100</td>
                <td onClick={modificar_caja}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>Caja 4</td>
                <td>250x250x100</td>
                <td onClick={modificar_caja}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Cajas;
