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
      .then((response) => {
        console.log(response.data); // Verifique os dados retornados pela API
        setProdutos(response.data);
      })
      .catch((error) => console.error("Erro na requisição:", error));
  }, []);

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.length > 0 ? (
          produtos.map((produto) => (
            <li key={produto.id}>
              {produto.nome} | {produto.descricao} | {produto.quantidades} | {produto.preco} | {produto.categoria}
            </li>
          ))
        ) : (
          <li>Nenhum produto encontrado.</li>
        )}
      </ul>
    </div>
  );
};

export default VerProdutos;
