import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/navbar.css";
import biboLogo from "../assets/imagens/bibo.png"; 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
     <a className="navbar-brand" href="/">
        <img
          src={biboLogo}
          alt="Ícone"
          style={{ height: "30px", width: "80px" }}/>
      </a>       
    </nav>
  );
}

export default Navbar;
