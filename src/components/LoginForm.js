import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importa os estilos

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get();
      const users = response.data;
  
      // Verifica se o usuário existe
      const user = users.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );
  
      if (user) {
        alert('Login realizado com sucesso!');
        console.log('Usuário autenticado:', user);
      } else {
        alert('Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao conectar na API:', error);
      alert('Erro ao conectar no servidor.');
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-left">
      <img
  src="/assets/skeleton.png"
  alt="Skeleton Illustration"
  className="login-image"/>
      <div className="login-slogan">
        <h2>Code Team</h2>
        <p>Sistema de Gerenciamento de Estoque</p>
      </div>
      </div>

      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
          <h3>Faça login na sua conta</h3>
          <p>Confira o que está acontecendo com o seu negócio</p>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange} placeholder='Digite seu usuário'
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange} placeholder='**********'
            required
          />
          <button type="submit" className="login-button">Login</button>
          <p className="login-footer">
            Ainda não tem cadastro? <a href="/register">Criar uma conta</a>
          </p>
        </form>
      </div>
      
    </div>
  );
};

export default LoginForm;
