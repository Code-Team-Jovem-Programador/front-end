import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fazendo a requisição POST para o backend
      const response = await axios.post(
        'https://gerenciador-estoque-prod.onrender.com/register/',
        formData
      );

      // Atualiza a mensagem de sucesso
      setMessage('Cadastro realizado com sucesso!');
    } catch (error) {
      // Atualiza a mensagem de erro
      setMessage('Erro ao cadastrar. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Usuário:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;

