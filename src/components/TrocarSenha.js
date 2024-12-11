import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const TrocarSenha = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire({
        title: "Erro!",
        text: "As senhas não coincidem.",
        icon: "error",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#631E4D",
      });
      return;
    }
  
    const token = localStorage.getItem("token"); // Recupere o token armazenado
  
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/change-password/",
        {
          old_password: formData.oldPassword,
          new_password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Inclua o token no cabeçalho
          },
        }
      );
  
      Swal.fire({
        title: "Sucesso!",
        text: "Senha alterada com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#631E4D",
      });
  
      navigate("/"); // Redireciona após sucesso
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Não foi possível alterar a senha. Verifique os dados e tente novamente.",
        icon: "error",
        confirmButtonText: "Tentar novamente",
        confirmButtonColor: "#631E4D",
      });
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
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
        <form onSubmit={handleChangePassword} className="register-form">
          <h3>Alteração de Senha</h3>
          <p className="register-subtitle">Insira sua nova senha</p>

          <label htmlFor="oldPassword">Senha Atual</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="newPassword">Nova Senha</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">Confirme a Nova Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-button">
            Alterar Senha
          </button>
          <a href="#" onClick={handleGoBack} className="back-link">
            Voltar
          </a>
        </form>
      </div>
    </div>
  );
};

export default TrocarSenha;
