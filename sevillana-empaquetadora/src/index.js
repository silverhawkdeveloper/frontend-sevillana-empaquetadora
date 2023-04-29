import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Pedidos from "./pages/Pedidos";
import Productos from "./pages/Productos";
import Cajas from "./pages/Cajas";
import Empleados from "./pages/Empleados";
import Figuras from "./pages/Figuras";
import EmpleadosReg from "./pages/EmpleadosReg";
import CajasReg from "./pages/CajasReg";
import CuboReg from "./pages/CuboReg";
import OrtoedroReg from "./pages/OrtoedroReg";
import CilindroReg from "./pages/CilindroReg";
import EsferaReg from "./pages/EsferaReg";
import PedidosReg from "./pages/PedidosReg";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="productos" element={<Productos />} />
        <Route path="cajas" element={<Cajas />} />
        <Route path="empleados" element={<Empleados />} />
        <Route path="figuras" element={<Figuras />} />
        <Route path="empleados_reg" element={<EmpleadosReg />} />
        <Route path="cajas_reg" element={<CajasReg />} />
        <Route path="cubo_reg" element={<CuboReg />} />
        <Route path="ortoedro_reg" element={<OrtoedroReg />} />
        <Route path="cilindro_reg" element={<CilindroReg />} />
        <Route path="esfera_reg" element={<EsferaReg />} />
        <Route path="pedidos_reg" element={<PedidosReg />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);