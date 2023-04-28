import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Pedididos from "./pages/Pedididos";
import Productos from "./pages/Productos";
import Cajas from "./pages/Cajas";
import Empleados from "./pages/Empleados";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="pedididos" element={<Pedididos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="cajas" element={<Cajas />} />
          <Route path="empleados" element={<Empleados />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
