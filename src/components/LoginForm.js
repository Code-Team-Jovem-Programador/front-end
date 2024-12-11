import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importa os estilos
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa o SweetAlert2

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

      if (token) {
        // Armazenar o token no localStorage
        localStorage.setItem('accessToken', token);

        // Confirmar se o token foi armazenado corretamente
        console.log('Token armazenado:', localStorage.getItem('accessToken'));

        // Redirecionar para a página de produtos
        navigate('/produtos');
      } else {
        // Caso o token não esteja presente na resposta
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Token não retornado da API.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Erro ao fazer login. Verifique suas credenciais.',
        confirmButtonText: 'Tentar novamente',
        confirmButtonColor: '#631E4D',
      });
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
        <div className='slogan'>
          <h2>Code Team</h2>
          <p>Sistema de Gerenciamento de Estoque</p>
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h3>Faça login na sua conta</h3>
          <p className="login-subtitle">Confira o que está acontecendo com o seu negócio</p>
          
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} placeholder='Digite seu usuário'
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder='**********'
            required
          />
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
