import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../imagenes/logo.png';
import empleados_blanco from '../../imagenes/iconos/empleados_blanco.png';
import empleados from '../../imagenes/iconos/empleados+.png';
import boton_emer from '../../imagenes/iconos/boton-emergencia.png';
import '../../css/app.css';

function Empleados() {
  const navigate = useNavigate();

  useEffect(() => {
    // La función que deseas ejecutar al montar el componente
    console.log('El contenido HTML se ha cargado');
  }, []);

  function modificar_empleado() {
    console.log('Entrando en la función modificar_caja');
    localStorage.setItem('Modificar_empleado', true);
    navigate('/empleados_reg');
  }

  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={empleados_blanco} alt="logo sevillana empaquetadora" />
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Log out</Link></button>
        </div>

      </div >

      <div id="contenedor_blanco">

        <div id="contenedor_boton">
          <div id="boton_imagen">
            <Link to="/Empleados_reg"><img id="iconos_btn" src={empleados} alt="boton nuevo empleado" /></Link>
          </div>
          <div id="boton_texto"><p>Nuevo empleado</p></div>
        </div>

        <div id="contenedor_contenido">
          <table>
            <tbody>
              <tr>
                <th>Rol</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Modificar</th>
              </tr>
              <tr>
                <td>Admin</td>
                <td>Daniel Díaz</td>
                <td>612345678</td>
                <td>daniel@email.com</td>
                <td onClick={modificar_empleado}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>Admin</td>
                <td>Elisabeth Olsen</td>
                <td>612345678</td>
                <td>olsen@email.com</td>
                <td onClick={modificar_empleado}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>User</td>
                <td>Griffin</td>
                <td>612345678</td>
                <td>griffin@email.com</td>
                <td onClick={modificar_empleado}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
              <tr>
                <td>User</td>
                <td>Swanson</td>
                <td>612345678</td>
                <td>swanson@email.com</td>
                <td onClick={modificar_empleado}><Link><img className="boton_emer" src={boton_emer} alt="boton modificar" /></Link></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Empleados;
