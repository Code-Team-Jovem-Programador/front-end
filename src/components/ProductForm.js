import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    nome: "",
    quantidade: "",
    valor: "",
    categoria: "",
    descricao: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`https://gerenciador-estoque-prod.onrender.com/produtos/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar produto:", error);
          alert("Erro ao carregar produto.");
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = id
      ? `https://gerenciador-estoque-prod.onrender.com/produtos/${id}`
      : "https://gerenciador-estoque-prod.onrender.com/produtos/";

    const method = id ? "put" : "post";

    axios[method](url, product)
      .then(() => {
        alert("Produto salvo com sucesso!");
        navigate("/produtos");
      })
      .catch((error) => {
        console.error("Erro ao salvar produto:", error);
        alert("Erro ao salvar produto.");
      });
  };

  return (
    <div className="product-form-container">
      <h1>{id ? "Editar Produto" : "Cadastrar Produto"}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Produto:
          <input
            type="text"
            value={product.nome}
            onChange={(e) => setProduct({ ...product, nome: e.target.value })}
          />
        </label>
        <label>
          Quantidade:
          <input
            type="number"
            value={product.quantidade}
            onChange={(e) =>
              setProduct({ ...product, quantidade: e.target.value })
            }
          />
        </label>
        <label>
          Valor:
          <input
            type="text"
            value={product.valor}
            onChange={(e) => setProduct({ ...product, valor: e.target.value })}
          />
        </label>
        <label>
          Categoria:
          <input
            type="text"
            value={product.categoria}
            onChange={(e) =>
              setProduct({ ...product, categoria: e.target.value })
            }
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={product.descricao}
            onChange={(e) =>
              setProduct({ ...product, descricao: e.target.value })
            }
          ></textarea>
        </label>
        <div className="form-actions">
          <button type="button" onClick={() => navigate("/produtos")}>
            Cancelar
          </button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
