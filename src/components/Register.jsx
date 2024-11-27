import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Register.css"; 
import axios from "axios"; 



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
      <div className="register-form">
        <img src="./public/skeleton.png" />
        <h1>Cadastre sua nova conta</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Usuário"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Registrar</button>
        </form>
        <p>
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
