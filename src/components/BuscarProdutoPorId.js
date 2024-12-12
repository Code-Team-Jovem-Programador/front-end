import React, { useState } from "react";
import axios from "axios";
import "./VerProdutos.css"; // Estilo da página

const BuscarProdutoPorId = () => {
  const [produtoId, setProdutoId] = useState("");
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarProduto = () => {
    if (!produtoId.trim()) {
      setError("Por favor, insira um ID válido.");
      return;
    }

    setLoading(true);
    setError("");
    setProduto(null);

    axios
      .get(`https://gerenciador-estoque-back.onrender.com/api/produtos/${produtoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setProduto(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setError("Produto não encontrado.");
        } else {
          setError("Ocorreu um erro ao buscar o produto.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="search-wrapper">
      <img src="/caveirinha.png" className="caveirinha-icon" alt="Caveirinha" />
      <div className="search-container">
        <input type="text" placeholder="Pesquisar" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} className="search-input" />
        <div className="botao">
          <button className="search-button" onClick={buscarProduto}>
            <img src="/pesquisar.png" alt="Imagem do botão" />
          </button>
        </div>
      </div>
      {loading ? "Carregando...":""}
      {error && <p>{error}</p>}
          {produto && (
            <div style={{ marginTop: "20px", textAlign: "left" }}>
              <h2>Nome: {produto.nome}</h2>
              <p>Descrição: {produto.descricao}</p>
            </div>
          )}
    </div>
  );
};

export default BuscarProdutoPorId;
