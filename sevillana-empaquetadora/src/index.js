import React from 'react';
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
// BrowserRouter Usado anteriormente

import Login from "./pages/Login";
import Home from "./pages/Home";

//Empleados
import Empleados from "./pages/empleados/Empleados";
import EmpleadosReg from "./pages/empleados/EmpleadosReg";
import EmpleadosGraf from "./pages/empleados/EmpleadosGraf";

//Pedidos
import Pedidos from "./pages/pedidos/Pedidos";
import PedidosReg from "./pages/pedidos/PedidosReg";
import PedidosMod from "./pages/pedidos/PedidosMod";
import PedidosGraf from "./pages/pedidos/PedidosGraf";

//Cajas
import Cajas from "./pages/cajas/Cajas";
import CajasReg from "./pages/cajas/CajasReg";
import CajasGraf from "./pages/cajas/CajasGraf";

//Productos
import Productos from "./pages/productos/Productos";
import Figuras from "./pages/productos/Figuras";
import CuboReg from "./pages/productos/CuboReg";
import OrtoedroReg from "./pages/productos/OrtoedroReg";
import CilindroReg from "./pages/productos/CilindroReg";
import EsferaReg from "./pages/productos/EsferaReg";
import ProductosGraf from "./pages/productos/ProductosGraf";

export default function App() {
  return (
    <HashRouter>
      <Routes>

        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />

        <Route path="empleados" element={<Empleados />} />
        <Route path="empleados_reg" element={<EmpleadosReg />} />
        <Route path="empleados_graf" element={<EmpleadosGraf />} />

        <Route path="pedidos" element={<Pedidos />} />
        <Route path="pedidos_reg" element={<PedidosReg />} />
        <Route path="pedidos_mod" element={<PedidosMod />} />
        <Route path="pedidos_graf" element={<PedidosGraf />} />

        <Route path="cajas" element={<Cajas />} />
        <Route path="cajas_reg" element={<CajasReg />} />
        <Route path="cajas_graf" element={<CajasGraf />} />

        <Route path="productos" element={<Productos />} />
        <Route path="figuras" element={<Figuras />} />
        <Route path="cubo_reg" element={<CuboReg />} />
        <Route path="ortoedro_reg" element={<OrtoedroReg />} />
        <Route path="cilindro_reg" element={<CilindroReg />} />
        <Route path="esfera_reg" element={<EsferaReg />} />
        <Route path="productos_graf" element={<ProductosGraf />} />

      </Routes>
    </HashRouter>
  );
}

// Para sevidor local 
//export const ruta = 'http://localhost:5000/'
// Para despliegue
export const ruta = 'https://backend-sevillana-empaquetadora-production.up.railway.app/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);