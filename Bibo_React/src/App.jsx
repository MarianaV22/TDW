import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import MinhaBibo from "./components/MinhaBibo.jsx";
//import ProcLibra from "./components/ProcLibra.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Página inicial */}
        <Route path="/MinhaBibo" element={<MinhaBibo />} />
      </Routes>
    </Router>
  );
}

export default App;
