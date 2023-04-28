import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import empleados_blanco from '../imagenes/iconos/empleados_blanco.png';
import flecha from '../imagenes/iconos/flecha.png';
import '../css/app.css';

const EmpleadosReg = () => {

  function Sing() {
    console.log('Entrando en la función fetch');
    /*
    const email = document.getElementById("email");
    const contasenia = document.getElementById("contasenia");

    let datos = {
      "email": "",
      "contrasenia": ""
    };
    datos.email = email.value;
    datos.contrasenia = contasenia.value;

    if (XMLHttpRequest) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          let respuesta = xhr.responseText;
          console.log(respuesta);
        }
      };
      xhr.open("POST", "http://localhost:5000/auth/autenticado");
      xhr.send(JSON.stringify(datos));
    }
    */
  }

  return (
    <>
      <div id="contenedor_negro">
        <div id="contenedor_logo">
          <Link to="/"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
          <img id="iconos_blanco" src={empleados_blanco} alt="logo sevillana empaquetadora" />
        </div>
        <div id="contenedor_usuario">
          <h3>Usuario</h3>
          <h4>daniel@email.com</h4>
          <button id="boton_out"><Link id="boton_out" to="/">Sign out</Link></button>
        </div>
      </div >
      <div id="contenedor_blanco">
        <div id="contenedor_texto"><h2>Datos</h2></div>
        <div id="contenedor_formulario">
          <form>
            <select>
              <option value={'admin'}>Administrador</option>
              <option value={'user'}>Usuario</option>
            </select>
            <input id="nombre" type="text" placeholder="Nombre" />
            <input id="telefono" type="number" placeholder="telefono" />
            <input id="email" type="text" placeholder="Email" />
            <input id="contasenia" type="text" placeholder="Contraseña" />
          </form>
        </div>
        <div id="contenedor_boton">
          <div id="boton_texto"><p>Guardar</p></div>
          <div id="boton_imagen" onClick={() => Sing()}>
            <Link to="/"><img id="iconos_btn" src={flecha} alt="boton flecha" /></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpleadosReg;
