import axios from "axios";

const api = axios.create({
  baseURL: "https://gerenciador-estoque-prod.onrender.com",
});

// Adicionar o token JWT em todas as requisições
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Atualizar o token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data.code === "token_not_valid") {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const { data } = await axios.post("/api/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", data.access);
        error.config.headers.Authorization = `Bearer ${data.access}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);

//Conexão para ver produtos
api.get("/produtos/")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));

//Conexão para criação de produto
api.post("/produtos/", {
  nome: "Produto A",
  descricao: "Descrição do Produto A",
  preco: 50.0,
})
  .then((response) => console.log("Produto criado:", response.data))
  .catch((error) => console.error(error));

//Conexão para listar produtos
api.get("/produtos/listar/")
  .then((response) => console.log("Produtos:", response.data))
  .catch((error) => console.error(error));

//Conexão para pesquisa de produto por id
api.get("/produtos/1/")
  .then((response) => console.log("Produto:", response.data))
  .catch((error) => console.error(error));

//Conexão para exportar tabela em CSV
api.post("/export/csv/")
  .then((response) => console.log("Exportado para CSV:", response.data))
  .catch((error) => console.error(error));

//Conexão para exportar tabela em XLSX
api.post("/export/xlsx/")
  .then((response) => console.log("Exportado para XLSX:", response.data))
  .catch((error) => console.error(error));

//Conexão para exportar tabela em PDF
api.post("/export/pdf/")
  .then((response) => console.log("Exportado para PDF:", response.data))
  .catch((error) => console.error(error));

export default api;
