import React, { useState } from "react";
import axios from "axios";
import "./CriarProduto.css";

const CriarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidades: "",
    categoria: "",
  });

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
    <form onSubmit={handleSubmit} className="form-criarProduto">
      <label className="label-cor">
        Nome:
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
            onChange={(e) =>
              setProduto({ ...produto, quantidades: e.target.value })
            }
          />        
        </label>

        <label className="label-cor">Preço:
          <input
            type="number"
            value={produto.preco}
            onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
          />         
        </label>

        <label className="label-cor">Categoria: 
          <input
            type="text"
            value={produto.categoria}
            onChange={(e) =>
              setProduto({ ...produto, categoria: e.target.value })
            }
          />         

        </label>

        <label className="label-descricao">Descrição:</label>
          <textarea
            value={produto.descricao}
            onChange={(e) => setProduto({ ...produto, descricao: e.target.value })}
            className="input-descricao"
          />


      <button type="submit" className="btn-criarProduto">
        Criar Produto
      </button>
    </form>
  );
};

export default CriarProduto;
