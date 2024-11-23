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



export default api;
