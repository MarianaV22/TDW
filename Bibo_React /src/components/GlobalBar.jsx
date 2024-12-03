import React, { useState } from "react";
import "../components/styles/home.css"; 

function GlobalBar({ onSearch, onCategoryChange, toggleMinhaBibo }) {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    if (!query.trim()) { //trim = permite remover os espaços em branco 
      alert("Por favor, insire uma palavra-chave ou o nome do livro para poder pesquisar!");
      return;
    }
    onSearch(query, null);
  };

  return (
    <div className="global-search-bar">
      <div className="search-container">
        {/* Input de texto */}
        <input type="text" className="form-control" placeholder="Procurar livros..." value={query}
          onChange={(e) => setQuery(e.target.value)}/>

        {/* Select de categorias */}
        <select
          className="form-select"
          onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Todas as Categorias</option>
          <option value="Fiction">Ficção</option>
          <option value="Science">Ciência</option>
          <option value="History">História</option>
          <option value="Romance">Romance</option>
        </select>

        {/* Botão de pesquisa */}
        <button className="btn btn-search btn-primary" onClick={handleSearchClick}>
          Procurar
        </button>

        {/* Botão "Minha Bibo" */}
        <button className="btn btn-dark" onClick={toggleMinhaBibo}>
          A minha Bibo
        </button>
      </div>
    </div>
  );
}

export default GlobalBar;
