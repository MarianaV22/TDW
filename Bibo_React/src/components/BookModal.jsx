import React from "react";

function BookModal({ book, onClose, onAddToBiblioteca }) {
  const handleAddToBiblioteca = () => {
    onAddToBiblioteca(book); // Adiciona o livro à biblioteca
    onClose(); // Fecha o modal
  };

  return (
    <div className="modal show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book.volumeInfo.title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} alt={book.volumeInfo.title} className="img-fluid"/>
            <h5>Autor: {book.volumeInfo.authors?.join(", ") || "Desconhecido"}</h5>
            <p>{book.volumeInfo.description || "Sem descrição disponível."}</p>

            <button className="btn btn-dark mt-3 me-2" onClick={handleAddToBiblioteca}>
              Adicionar à Minha Bibo
            </button>

            <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary mt-3" >
              Sabe Mais
            </a>

          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
