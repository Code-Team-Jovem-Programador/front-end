import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importa os estilos
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para o loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Ativa o loading

    try {
      const response = await axios.post('https://gerenciador-estoque-prod.onrender.com/api/token', {
        username,
        password,
      });
      const token = response.data.access;
      localStorage.setItem('accessToken', token); // Armazena o token no localStorage
      navigate('/produtos'); // Redireciona para VerProdutos
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false); // Desativa o loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="/assets/skeleton.png"
          alt="Skeleton Illustration"
          className="login-image"
        />
        <h2>Code Team</h2>
        <p>Sistema de Gerenciamento de Estoque</p>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h3>Faça login na sua conta</h3>
          <p>Confira o que está acontecendo com o seu negócio</p>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="show-password">
            <input
              type="checkbox"
              id="showPassword"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Mostrar senha</label>
          </div>
          <button type="submit" className="login-button">
            {isLoading ? <span className="spinner"></span> : 'Login'}
          </button>
          <p className="login-footer">
            Ainda não tem cadastro? <a href="/register">Criar uma conta</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
