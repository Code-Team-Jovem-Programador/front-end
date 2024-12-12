import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Importe o Swal
import "./CriarProduto.css";

const CriarProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "", // A descrição pode ficar vazia sem problemas
    preco: "",
    quantidades: "",
    categoria: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza a requisição de criação do produto
    axios
      .post(
        "https://gerenciador-estoque-back.onrender.com/api/produtos/",
        produto,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        // Exibe o SweetAlert de sucesso no centro da tela
        Swal.fire({
          position: "center", // Posiciona no centro da tela
          icon: "success",
          title: "Produto criado com sucesso!",
          showConfirmButton: false, // Exibe o botão de confirmação
          confirmButtonText: "Ok", // Texto do botão
          confirmButtonColor: "#3085d6", // Cor do botão de confirmação
          timer: 1500,
        }).then(() => {
          // Recarrega a página assim que o usuário clicar em "Ok" após sucesso
          window.location.reload();
        });
      })
      .catch((error) => {
        // Exibe o SweetAlert de erro no centro da tela
        Swal.fire({
          position: "center", // Posiciona no centro da tela
          icon: "error",
          title: "Erro ao criar o produto!",
          text: "Tente novamente",
          showConfirmButton: false, // Exibe o botão de confirmação
          confirmButtonText: "Ok", // Texto do botão
          confirmButtonColor: "#d33", // Cor do botão de confirmação
          timer: 1500,
        });
        console.error(error); // Log do erro no console para depuração
      });
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

      <label className="label-cor">
        Quantidade:
        <input
          type="number"
          value={produto.quantidades}
          onChange={(e) =>
            setProduto({ ...produto, quantidades: e.target.value })
          }
        />
      </label>

      <label className="label-cor">
        Preço:
        <input
          type="number"
          value={produto.preco}
          onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
        />
      </label>

      <label className="label-cor">
        Categoria:
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