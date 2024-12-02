import React, { useState } from "react";

function BibliotecaModal({ book, onClose, onGuardarOpin, onRemove }) {
  const [review, setReview] = useState(book.review || "");

  const handleGuardarOpin = () => {
    onGuardarOpin(book, review); // Salva a opinião
    onClose(); // Fecha o modal
  };

  const handleRemoveBook = () => {
    onRemove(book); // Remove o livro da biblioteca
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
            <img src={book.volumeInfo.imageLinks?.thumbnail || ""} alt={book.volumeInfo.title} className="img-fluid mb-3"/>
            <h5>Autor: {book.volumeInfo.authors?.join(", ") || "Desconhecido"}</h5>
            <p>{book.volumeInfo.description || "Sem descrição disponível."}</p>

            <textarea className="form-control mt-3" placeholder="Deixe sua avaliação ou opinião..." value={review}
              onChange={(e) => setReview(e.target.value)}></textarea>

          </div>
          <div className="modal-footer">

            <button className="btn btn-success" onClick={handleGuardarOpin}>
              Salvar Opinião
            </button>

            <button className="btn btn-danger" onClick={handleRemoveBook}>
              Remover da Bibo
            </button>

            <button className="btn btn-secondary" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BibliotecaModal;
