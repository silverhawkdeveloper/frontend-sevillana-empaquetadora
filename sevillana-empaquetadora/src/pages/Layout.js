import { Outlet, Link } from "react-router-dom";
import '../css/menu.css';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Pedididos">Pedididos</Link>
          </li>
          <li>
            <Link to="/Productos">Productos</Link>
          </li>
          <li>
            <Link to="/Cajas">Cajas</Link>
          </li>
          <li>
            <Link to="/Empleados">Empleados</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
