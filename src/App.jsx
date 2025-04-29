
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './layouts/mainLayout';
import { Inicio } from "./layouts/login/login";


function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Inicio />} />

        </Routes>
      </BrowserRouter>
  )
}

export default App
