import React, { useEffect, useState } from "react";
import axios from "axios";

const VerProdutos = () => {
  const [produtos, setProdutos] = useState([]);

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

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>{produto.nome} {produto.quantidades} {produto.descricao} {produto.preco} {produto.categoria}</li>
        ))}
      </ul>
    </div>
  );
};

export default VerProdutos;
