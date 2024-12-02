import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/navbar.css";
import biboLogo from "../assets/imagens/bibo.png"; // Importar a imagem diretamente senao nao aprece

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
     <a className="navbar-brand" href="/">
        <img
          src={biboLogo}
          alt="Ícone"
          style={{ height: "30px", width: "80px" }}
        />
      </a>


      <button
        className="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alternar navegação">
       
       <span className="navbar-toggler-icon"></span>
       
      </button>
      {/*<div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Página Inicial
            </Link>
          </li>
         li className="nav-item">
            <Link className="nav-link" to="/MinhaBibo">
              A minha Bibo
            </Link>
          </li>
         
        </ul>
      </div>  */}
       
    </nav>
  );
}

export default Navbar;
