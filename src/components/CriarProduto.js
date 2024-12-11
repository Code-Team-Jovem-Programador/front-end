import React, { useState } from "react";
import axios from "axios";

const CriarProduto = () => {
  const [produto, setProduto] = useState({ nome: "", descricao: "", preco: "", quantidades: "", categoria: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/produtos/", produto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => alert("Produto criado com sucesso!"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={produto.nome}
        onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={produto.descricao}
        onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={produto.quantidades}
        onChange={(e) => setProduto({ ...produto, quantidades: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço"
        value={produto.preco}
        onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
      />      
      <input
        type="text"
        placeholder="Categoria"
        value={produto.categoria}
        onChange={(e) => setProduto({ ...produto, categoria: e.target.value })}
      />
      <button type="submit">Criar Produto</button>
    </form>
  );
};

export default CriarProduto;
