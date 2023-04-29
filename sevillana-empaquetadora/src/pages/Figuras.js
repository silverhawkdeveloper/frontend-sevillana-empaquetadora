import { Link } from "react-router-dom";
import logo from '../imagenes/logo.png';
import cubo from '../imagenes/figuras_geometricas/cubo.png';
import ortoedro from '../imagenes/figuras_geometricas/ortoedro.png';
import cilindro from '../imagenes/figuras_geometricas/cilindro.png';
import esfera from '../imagenes/figuras_geometricas/esfera.png';
import '../css/figuras.css';

const Figuras = () => {
  return (
    <div id='contenedor'>
      <div id="contenedor_negro">

        <div id="contenedor_logo">
          <Link to="/Home"><img id="logo" src={logo} alt="logo sevillana empaquetadora" /></Link>
        </div>

        <div id="contenedor_usuario">
          <h4>daniel@email.com</h4>
          <button><Link id="boton_out" to="/">Sign out</Link></button>
        </div>

      </div>

      <div id="contenedor_blanco_figuras">

        <div id="contenedor_texto"><h2>Elige la figura similar al prducto</h2></div>

        <div id="contenedor_figuras">
          <nav>
            <ul>
              <li id="boton"> <Link to="/Cubo_reg"><div id="cuadrado">
                <img id="figuras" src={cubo} alt="cubo" />
                </div>CUBO</Link></li>
              <li id="boton"><Link to="/Ortoedro_reg"><div id="cuadrado">
                <img id="figuras" src={ortoedro} alt="ortoedro" />
                </div>ORTOEDRO</Link> </li>
              <li id="boton"><Link to="/Cilindro_reg"><div id="cuadrado">
                <img id="figuras" src={cilindro} alt="cilindro" />
                </div>CILINDRO</Link></li>
              <li id="boton"><Link to="/Esfera_reg"><div id="cuadrado">
                <img id="figuras" src={esfera} alt="esfera" />
                </div>ESFERA</Link></li>
            </ul>
          </nav>
        </div>

      </div>
    </div>
  );
};

export default Figuras;
