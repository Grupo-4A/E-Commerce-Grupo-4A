
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './layouts/mainLayout';
import { Inicio } from "./layouts/login/login";
import { Catalog } from "./layouts/cataloglayout";

function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Inicio />} />
        <Route path="/catalogo" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
