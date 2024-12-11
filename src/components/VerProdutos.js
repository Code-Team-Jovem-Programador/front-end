import React, { useEffect, useState } from "react";
import axios from "axios";
import "./VerProdutos.css"; // Estilo da página
import "./ExportarPopup.css"; // Estilo do pop-up
import ExportarCsv from "./ExportarCsv";
import ExportarXlsx from "./ExportarXlsx";
import ExportarPdf from "./ExportarPdf";
import EditarProduto from "./EditProducts";
import Swal from 'sweetalert2';

import api from "./axiosConfig"; // Certifique-se de importar o arquivo correto
import CriarProduto from "./CriarProduto";
 
const VerProdutos = () => { 
  const [produtos, setProdutos] = useState([]); // Lista de produtos
  const [showPopup, setShowPopup] = useState(false); // Controle do pop-up
  const [showPopupAdd, setShowPopupAdd] = useState(false); // Controle do pop-up
  const [showPopupEdt, setShowPopupEdt] = useState(false); // Controle do pop-up
  const [error, setError] = useState("");

  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Buscar produtos ao carregar o componente
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // Verifica se o token existe
    if (!accessToken) {
      setError("Token de acesso não encontrado.");
      return;
    }

    axios
      .get("https://gerenciador-estoque-back.onrender.com/api/produtos", {
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

  
  // Função para deletar um produto
  const handleDelete = async (id) => {
    // Primeiro exibe o SweetAlert com a confirmação
    Swal.fire({
      title: "Você tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, delete isso!",
      color: "#631E4D"
    }).then(async (result) => {
      // Se o usuário confirmar a exclusão
      if (result.isConfirmed) {
        try {
          // Realiza a requisição de delete
          const response = await api.delete(`produtos/${id}`);
          
          // Exibe o SweetAlert de sucesso
          Swal.fire({
            title: "Deletado!",
            text: "Seu produto foi deletado.",
            icon: "success"
          });
  
          // Atualiza a lista de produtos após a exclusão, se necessário
          setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
            console.error("Erro de rede. Verifique a conexão ou a URL do servidor.");
          } else if (error.response) {
            console.error(`Erro do servidor: ${error.response.status} - ${error.response.data}`);
          } else {
            console.error("Erro desconhecido:", error.message);
          }
        }
      }
    });
  };
  

  // Funções para abrir e fechar o pop-up de download
  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  // Funções para abrir e fechar o pop-up de adição de item
  const openPopupAdd = () => setShowPopupAdd(true);
  const closePopupAdd = () => setShowPopupAdd(false);

  // Funções para abrir e fechar o pop-up de edição de item
    const openPopupEdt = (id) => {
      setSelectedProductId(id);
      setShowPopupEdt(true);
    };
    const closePopupEdt = () => setShowPopupEdt(false);

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
                <button className="edit-button" onClick={() => openPopupEdt(produto.id)}>
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
        <button className="add-button" onClick={openPopupAdd}>
          Adicionar
        </button>
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
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Pop-up para Adição de produtos */}
      {showPopupAdd && (
        <div className="popup-overlay-add">
          <div className="popup-content-add">
            <button className="close-icon" onClick={closePopupAdd}>×</button>
            <h2 className="popup-title">Novo Produto</h2>
              <div className="popup-buttons">
                <CriarProduto />
              </div>           
          </div>
        </div>
      )}

      {/* Pop-up para edição de produtos */}
      {showPopupEdt && (
        <div className="popup-overlay-add">
          <div className="popup-content-add">
          <button className="close-icon" onClick={closePopupEdt}>×</button>
            <h2 className="popup-title">Editar</h2>
            <div className="popup-buttons">
              <EditarProduto productId={selectedProductId} />
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default VerProdutos;

