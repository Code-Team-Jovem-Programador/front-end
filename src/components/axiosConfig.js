import axios from "axios";

// Configuração do Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000//api", // Substitua pela URL base da sua API
  timeout: 10000, // Timeout para as requisições
});

// Interceptadores para incluir o token de autenticação (se necessário)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Substitua conforme necessário
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
