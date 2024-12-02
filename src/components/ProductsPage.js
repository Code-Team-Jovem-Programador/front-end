import React, { useState, useEffect } from "react";
import "./ProductsPage.css"; 
import axios from "axios"; 

const ProductsPage = () => {
  const [products, setProducts] = useState([]); // Lista de produtos
  const [search, setSearch] = useState(""); // Campo de busca
  const [showDownloadPopup, setShowDownloadPopup] = useState(false); // Estado do pop-up de download

  // Requisição ao backend para buscar produtos
  useEffect(() => {
    axios
      .get("https://gerenciador-estoque-prod.onrender.com/produtos/") 
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  // Filtrar produtos com base na busca
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">
      <h1 className="products-title">Produtos</h1>

      {/* Campo de busca */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button className="search-button">🔍</button>
      </div>

      {/* Lista de produtos */}
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <span>{product.name}</span>
              <div className="product-actions">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">Nenhum produto cadastrado</p>
        )}
      </div>

      {/* Botões principais */}
      <div className="main-buttons">
        <button className="download-button" onClick={() => setShowDownloadPopup(true)}>
          Download
        </button>
        <button className="add-button">Adicionar</button>
      </div>

      {/* Pop-up de download */}
      {showDownloadPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Download</h2>
            <button className="popup-button">PDF</button>
            <button className="popup-button">Excel</button>
            <button className="popup-button">CSV</button>
            <button
              className="close-popup-button"
              onClick={() => setShowDownloadPopup(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
