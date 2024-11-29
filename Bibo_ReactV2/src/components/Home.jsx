import React, { useState, useEffect } from "react";
import GlobalBar from "./GlobalBar";
import MinhaBibo from "./MinhaBibo";
import BookModal from "./BookModal";
import Paginacao from "./Paginacao";

function Home() {

  const [books, setBooks] = useState([]); // Livros por defeito
  const [searchResults, setSearchResults] = useState([]); // Resultados da pesquisa
  const [selectedBook, setSelectedBook] = useState(null); // Livro selecionado
  const [biblioteca, setBiblioteca] = useState([]); // Livros na "Minha Bibo"
  const [isMinhaBiboVisible, setIsMinhaBiboVisible] = useState(false); // Alternar "Minha Bibo"
  const [isSearching, setIsSearching] = useState(false); //  pesquisa ativa
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 12; // Número de itens por página



  useEffect(() => {
    const categories = ["romance", "fiction", "history", "science"];//as categorias dos livros que sao apresentadas por defeito
    const query = categories.join("+");

  //.......................... Chamar a API...................................//
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.items) {
          setBooks(data.items);
        } else {
          setBooks([]);
        }
      })
      .catch((error) => console.error("Erro ao carregar livros:", error));
  }, []);

  
  //.......................... API - procurar livros ...................................//
  const performSearch = (query, category) => {
    let searchQuery = query ? `q=${encodeURIComponent(query)}` : "q=";
    if (category) searchQuery += `+subject:${encodeURIComponent(category)}`;

    fetch(`https://www.googleapis.com/books/v1/volumes?${searchQuery}&maxResults=40`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.items || []);
        setIsSearching(true);
        setCurrentPage(1);
      })
      .catch((error) => console.error("Erro na pesquisa:", error));
  };

//................ Adicionar um livro à bibo .....................//
 const addToBiblioteca = (book) => {setBiblioteca((prevBiblioteca) => {
    const bookId = book.id || `${book.volumeInfo.title}-${book.volumeInfo.authors?.join("-")}`;
     // Verifica ou criar um identificador único para o livro

    // Evita duplicações                        (verifica se existem ids iguais)
    const isAlreadyAdded = prevBiblioteca.some((b) => b.id === bookId);
    if (!isAlreadyAdded) {
      return [...prevBiblioteca, { ...book, id: bookId, review: "" }];
    }
    return prevBiblioteca;
  });
  setSelectedBook(null); 
};

//................ Guarda a opiniao .....................//
  const guardarOpin= (book, review) => {
    setBiblioteca((prevBiblioteca) =>
      prevBiblioteca.map((b) =>
        b.id === book.id ? { ...b, review } : b // Atualiza a opinião do livro correspondente
      )
    );
  };

  
//................ Remover livro da Bibo .....................//
  const removeFromBiblioteca = (bookToRemove) => {
    setBiblioteca((prevBiblioteca) =>
      prevBiblioteca.filter((book) => book.id !== bookToRemove.id)
    );
  };
  
//................ Calculo da Paginação .....................//
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = isSearching? searchResults.slice(indexOfFirstItem, indexOfLastItem): books.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(
    (isSearching ? searchResults.length : books.length) / itemsPerPage
  );

  //.....................................//
  return (
    <div>
      <GlobalBar onSearch={performSearch} onCategoryChange={(category) => performSearch(null, category)}
        toggleMinhaBibo={() => setIsMinhaBiboVisible(!isMinhaBiboVisible)}/>

      {isMinhaBiboVisible ? (
      <MinhaBibo biblioteca={biblioteca}
      onGuardarOpin={guardarOpin} // passa a função guardar opiniao
      onRemove={removeFromBiblioteca} // passa a função remover da bibo 
    />
     
      ) : (
     //..............Resultados da pesquisa .......................//    
        <div className="container mt-5">
            <h2>{isSearching ? "Resultados da Pesquisa" : "Bibo..."}</h2>
            <div className="row g-3">
              {currentItems.map((book) => (
                <div className="col-md-3" key={book.id} onClick={() => setSelectedBook(book)} style={{ cursor: "pointer" }}>
                  <div className="card">
                    <img src={book.volumeInfo.imageLinks?.thumbnail || ""} className="card-img-top" alt={book.volumeInfo.title}/>
                    <div className="card-body text-center">
                      <h5 className="card-title">{book.volumeInfo.title}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    
            <Paginacao currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}/>
         </div>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddToBiblioteca={addToBiblioteca}
        />
      )}
    </div>
  );
}

export default Home;
