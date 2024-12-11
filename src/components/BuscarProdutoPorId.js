import React, { useState } from "react";
import axios from "axios";

const BuscarProdutoPorId = () => {
  const [produtoId, setProdutoId] = useState("");
  const [produto, setProduto] = useState(null);

  const buscarProduto = () => {
    axios
      .get(`http://127.0.0.1:8000/api/produtos/${produtoId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => setProduto(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="ID do Produto"
        value={produtoId}
        onChange={(e) => setProdutoId(e.target.value)}
      />
      <button onClick={buscarProduto}>Buscar Produto</button>
      {produto && (
        <div>
          <h2>{produto.nome}</h2>
          <p>{produto.descricao}</p>
        </div>
      )}
    </div>
  );
};

export default BuscarProdutoPorId;
