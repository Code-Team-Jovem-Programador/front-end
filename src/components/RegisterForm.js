import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa o SweetAlert2
import './RegisterForm.css'; // Importa os estilos
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://gerenciador-estoque-prod.onrender.com/api/register/', formData);

      // Alerta de sucesso com SweetAlert2
      Swal.fire({
        title: 'Sucesso!',
        text: 'Usuário cadastrado com sucesso!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#631E4D',
      });

      setTimeout(() => navigate('/login'), 2000); // Redireciona para o login após sucesso
    } catch (error) {
      // Alerta de erro com SweetAlert2
      Swal.fire({
        title: 'Erro!',
        text: 'Erro ao cadastrar o usuário. Verifique os dados informados.',
        icon: 'error',
        confirmButtonText: 'Tentar novamente',
        confirmButtonColor: '#631E4D',
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="register-container">
      <div className="register-left">
        <img
          src="/assets/skeleton.png"
          alt="Skeleton Illustration"
          className="register-image"
        />
        <div className="register-slogan">
          <h2>Code Team</h2>
          <p>Sistema de Gerenciamento de Estoque</p>
        </div>
      </div>
      <div className="register-right">
        <form onSubmit={handleRegister} className="register-form">
          <h3>Cadastre sua nova conta</h3>
          <p className="register-subtitle">Entre no nosso sistema e gerencie seu negócio</p>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Cadastrar</button>
          <a href= "#" onClick={handleGoBack} className='back-link'>Voltar</a>
        </form>
        </div>
    </div>
  );
};

export default RegisterForm;
