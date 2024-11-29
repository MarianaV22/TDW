import React, { useState } from "react";
import BibliotecaModal from "./BibliotecaModal";

function MinhaBibo({ biblioteca, onGuardarOpin, onRemove }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div className="container mt-5">
      <h2>A minha Bibo</h2>
      {biblioteca.length === 0 ? (
        <p>Atualmente não há livros na tua Bibo.</p>
      ) : (
        <div className="row g-3">
          {biblioteca.map((book) => (
            <div className="col-md-3" key={book.id} onClick={() => setSelectedBook(book)} style={{ cursor: "pointer" }}>
              <div className="card">
                <img src={book.volumeInfo.imageLinks?.thumbnail || ""} className="card-img-top" alt={book.volumeInfo.title}/>
                <div className="card-body text-center">
                  <h5 className="card-title">{book.volumeInfo.title}</h5>
                  <p><strong>Opinião:</strong> {book.review || "Nenhuma opinião adicionada."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <BibliotecaModal book={selectedBook}
              onClose={() => setSelectedBook(null)}
              onGuardarOpin={onGuardarOpin} // Corrigir prop
              onRemove={onRemove} // Corrigir prop
        />
      )}
    </div>
  );
}

export default MinhaBibo;
