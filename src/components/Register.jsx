import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5173/api/register", formData);
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar");
    }
  };

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
        <form onSubmit={handleSubmit} className="register-form">
          <h3>Cadastre sua nova conta</h3>
          <p>Entre no nosso sistema e gerencie seu negócio</p>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Digite seu usuário"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="**********"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="register-button">
            Cadastrar
          </button>
          <p className="register-footer">
            Já tem uma conta? <a href="/login">Entrar</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;