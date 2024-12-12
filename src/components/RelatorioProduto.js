import React from "react";
import "./RelatorioProduto.css"; // Importe o arquivo CSS

const RelatorioProduto = ({ produto, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">{produto.nome}</h2>
        <p><span className="keyword">Preço:</span> {produto.preco}</p>
        <p><span className="keyword">Quantidade:</span> {produto.quantidades}</p>
        <p><span className="keyword">Categoria:</span> {produto.categoria}</p>
        <p className="description"><span className="keyword">Descrição:</span> {produto.descricao}</p>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default RelatorioProduto;
