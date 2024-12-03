import React from "react";
import Paginacao from "./Paginacao";

function PesquisaLi({ searchResults, setSelectedBook, currentPage, totalPages, onPageChange }) {
  const itemsPerPage = 12;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-5">
      <h2>Resultados da tua Pesquisa:</h2>
      <div className="row g-3">
        {currentItems.map((book) => (
          <div className="col-md-3" key={book.id}onClick={() => setSelectedBook(book.volumeInfo)}style={{ cursor: "pointer" }}>
            <div className="card">
              <img src={book.volumeInfo.imageLinks?.thumbnail || ""}className="card-img-top"alt={book.volumeInfo.title}/>
              <div className="card-body text-center">
                <h5 className="card-title">{book.volumeInfo.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      <Paginacao
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
      />
    </div>
  );
}

export default PesquisaLi;
