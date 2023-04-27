import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Pedididos from "./pages/Pedididos";
import Productos from "./pages/Productos";
import Cajas from "./pages/Cajas";
import Empleados from "./pages/Empleados";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pedididos" element={<Pedididos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="cajas" element={<Cajas />} />
          <Route path="empleados" element={<Empleados />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
