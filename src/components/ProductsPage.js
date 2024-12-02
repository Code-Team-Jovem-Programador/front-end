import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar produtos
  useEffect(() => {
    axios
      .get("https://gerenciador-estoque-prod.onrender.com/produtos/listar")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
        setError("Erro ao carregar produtos.");
        setLoading(false);
      });
  }, []);

  // Deletar produto
  const handleDelete = (id) => {
    axios
      .delete(`https://gerenciador-estoque-prod.onrender.com/produtos/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Erro ao deletar produto:", error);
        alert("Erro ao deletar produto.");
      });
  };

  // Exportar produtos
  const handleExport = (format) => {
    const routes = {
      csv: "https://gerenciador-estoque-prod.onrender.com/export/csv/",
      xlsx: "https://gerenciador-estoque-prod.onrender.com/export/xlsx/",
      pdf: "https://gerenciador-estoque-prod.onrender.com/export/pdf/",
    };

    axios
      .post(routes[format], {}, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `produtos.${format}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(`Erro ao exportar ${format}:`, error);
        alert(`Erro ao exportar ${format}.`);
      });
  };

  // Redirecionar para cadastro
  const handleAddProduct = () => {
    navigate("/add-product");
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products-container">
      <h1>Produtos</h1>
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar..." />
      </div>
      {products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              {product.nome} - {product.quantidade}
              <button onClick={() => handleDelete(product.id)}>Excluir</button>
              <button onClick={() => navigate(`/edit-product/${product.id}`)}>
                Editar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
      <div className="actions">
        <button onClick={() => handleExport("csv")}>Exportar CSV</button>
        <button onClick={() => handleExport("xlsx")}>Exportar XLS</button>
        <button onClick={() => handleExport("pdf")}>Exportar PDF</button>
        <button onClick={handleAddProduct}>Adicionar Produto</button>
      </div>
    </div>
  );
};

export default ProductsPage;
