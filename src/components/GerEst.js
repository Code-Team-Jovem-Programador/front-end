import axios from 'axios';

const getToken = async () => {
  const url = "https://gerenciador-estoque-prod.onrender.com/api/token";
  
  // Dados para autenticação
  const data = {
    username: 'seu_usuario',
    password: 'sua_senha',
  };

  try {
    const response = await axios.post(url, data);
    const token = response.data.access; // A resposta geralmente contém o token no campo 'access'
    console.log('Token:', token);
    
    // Você pode armazenar o token e usá-lo para outras requisições
  } catch (error) {
    console.error('Erro ao obter o token:', error);
  }
};

getToken();