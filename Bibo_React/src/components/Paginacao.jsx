import React from "react";
import "../components/styles/home.css"; 

function Paginacao({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // Não renderiza a paginação se só houver uma página

  return (
    <div className="paginacao mt-4 d-flex justify-content-center">
      <button
        className="btn btn-mudar mx-1"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`btn mx-1 ${
            currentPage === index + 1 ? "btn-primary" : "btn-light"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-mudar mx-1"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </button>
    </div>
  );
}

export default Paginacao;
