import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarProduto = ({ productId }) => {
  const [produto, setProduto] = useState({
    nome: "Loading...",
    descricao: "Loading...",
    preco: 0,
    quantidades: 0,
    categoria: "Loading...",
  });

  useEffect(() => {
    if (productId) {
      axios
        .get(`http://127.0.0.1:8000/api/produtos/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          setProduto(response.data); // Preenche o estado com os dados do produto
        })
        .catch((error) => console.error("Erro ao carregar o produto:", error));
    }
  }, [productId]);

  const updateData = (e) => {
    e.preventDefault();
    axios
      .put(`http://127.0.0.1:8000/api/produtos/${productId}`, produto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        alert("Produto atualizado com sucesso!");
        console.log("Resposta:", response.data);
      })
      .catch((error) => console.error("Erro ao atualizar o produto:", error));
  };

  return (
    <form onSubmit={updateData} className="form-editarProduto">
      <label className="label-cor">Nome:
          <input
            type="text"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          />      
      </label>
      <label className="label-cor">Quantidade:
          <input
            type="number"
            value={produto.quantidades}
            onChange={(e) => setProduto({ ...produto, quantidades: e.target.value })}
          />
      </label>
      <label className="label-cor">Preço:
          <input
            type="number"
            value={produto.preco}
            onChange={(e) => setProduto({ ...produto, preco: parseFloat(e.target.value) })}
          />
      </label>
      <label className="label-cor">Categoria:
          <input
            type="text"
            value={produto.categoria}
            onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
          />
      </label>
      <label className="label-descricao">Descrição:</label>
          <textarea
            type="text"
            value={produto.descricao}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            className="input-descricao"
          />
      <button type="submit" className="btn-editarProduto">Salvar Alterações</button>
    </form>
  );
};

export default EditarProduto;
