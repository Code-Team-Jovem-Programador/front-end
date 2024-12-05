import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VerProdutos.css"; // Estilo da página
import "./ExportarPopup.css"; // Estilo do pop-up

const VerProdutos = () => { 
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [showPopup, setShowPopup] = useState(false); // Controle do pop-up

  // Buscar produtos ao carregar o componente
  useEffect(() => {
    axios
      .get("https://gerenciador-estoque-prod.onrender.com/api/produtos/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Funções para abrir e fechar o pop-up
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // Função para exportar arquivos
  const handleExport = (format) => {
    let url = "";

    // Define a URL de exportação com base no formato
    switch (format) {
      case "pdf":
        url = "https://gerenciador-estoque-prod.onrender.com/export/pdf/";
        break;
      case "csv":
        url = "https://gerenciador-estoque-prod.onrender.com/export/csv/";
        break;
      case "xlsx":
        url = "https://gerenciador-estoque-prod.onrender.com/export/xlsx/";
        break;
      default:
        return;
    }

    // Requisição de exportação
    axios
      .post(url, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        responseType: "blob", // Para baixar o arquivo
      })
      .then((response) => {
        // Criação de um link para download
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", `produtos.${format}`);
        fileLink.click();
      })
      .catch((error) => console.error("Erro ao exportar:", error));
  };

  return (
    <div className="container">
      {/* Cabeçalho da página */}
      <header className="products-header">
        <img src="/cabecalho.png"></img>
        <nav>
          <h1>Produtos</h1>
        </nav>
      </header>
      {/* fim do cabeçalho */}
      {/* barra de pesquisa */}
      <div className="search-container">
          <input type="text" placeholder="Pesquisar" className="search-input" />
          <div className="botao">
            <button className="search-button">
              <img src="/pesquisar.png" alt="Imagem do botão"></img>
            </button>
          </div>
      </div>
      {/* Lista de produtos */}
      <main className="products-list">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="product-item">
              <span>{produto.nome}</span>
              <div className="product-actions">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Excluir</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </main>

      {/* Rodapé com botões */}
      <footer className="products-footer">
        <button className="download-button" onClick={openPopup}>
          Download
        </button>
        <button className="add-button">Adicionar</button>
      </footer>

      {/* Pop-up para download */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="popup-title">Download</h2>
            <div className="popup-buttons">
              <button
                className="popup-button"
                onClick={() => handleExport("pdf")}
              >
                PDF
              </button>
              <button
                className="popup-button"
                onClick={() => handleExport("csv")}
              >
                CSV
              </button>
              <button
                className="popup-button"
                onClick={() => handleExport("xlsx")}
              >
                XLSX
              </button>
            </div>
            <button className="close-button" onClick={closePopup}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerProdutos;

