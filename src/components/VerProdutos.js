import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VerProdutos.css"; // Estilo da página
import "./ExportarPopup.css"; // Estilo do pop-up
import ExportarCsv from "./ExportarCsv";
import ExportarXlsx from "./ExportarXlsx";
import ExportarPdf from "./ExportarPdf";

import api from "./axiosConfig"; // Certifique-se de importar o arquivo correto

const VerProdutos = () => { 
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [showPopup, setShowPopup] = useState(false); // Controle do pop-up
  const [error, setError] = useState("");

  // Buscar produtos ao carregar o componente
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Verifica se o token existe
    if (!accessToken) {
      setError("Token de acesso não encontrado.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/produtos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError("Token expirado ou inválido. Por favor, faça login novamente.");
        } else {
          setError("Erro ao buscar os produtos.");
        }
        console.error(error);
      });
  }, []);
  
  // Função para editar um produto
  const handleEdit = (productId) => {
    const updatedData = {
      nome: "Produto Atualizado",
      descricao: "Descrição atualizada",
      preco: 60.0,
    };

    api.put(`/produtos/${productId}/`, updatedData)
      .then((response) => {
        console.log("Produto atualizado:", response.data);
        alert("Produto atualizado com sucesso!");
      })
      .catch((error) => console.error("Erro ao atualizar o produto:", error));
  };

  // Função para deletar um produto
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/produtos/${id}`);
      alert("Produto deletado com sucesso!");
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        console.error("Erro de rede. Verifique a conexão ou a URL do servidor.");
      } else if (error.response) {
        console.error(`Erro do servidor: ${error.response.status} - ${error.response.data}`);
      } else {
        console.error("Erro desconhecido:", error.message);
      }
    }
  };

  // Funções para abrir e fechar o pop-up
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

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
      <div className="search-wrapper">
        <img src="/caveirinha.png" className="caveirinha-icon" alt="Caveirinha" />
        <div className="search-container">
          <input type="text" placeholder="Pesquisar" className="search-input" />
          <div className="botao">
            <button className="search-button">
              <img src="/pesquisar.png" alt="Imagem do botão" />
            </button>
          </div>
        </div>
      </div>
            {/* Lista de produtos */}
      <div className="espace">
        <main className="products-list">
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className="product-item">
              <span>{produto.nome}</span>
              <div className="product-actions">
                <button className="edit-button" onClick={() => handleEdit(produto.id)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => handleDelete(produto.id)}>
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}

        </main>
      </div>
  

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
              <ExportarPdf />
              <ExportarCsv />
              <ExportarXlsx />
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

