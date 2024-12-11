import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import VerProdutos from './components/VerProdutos';
import CriarProduto from './components/CriarProduto';
import BuscarProdutoPorId from './components/BuscarProdutoPorId';
import ExportarCsv from './components/ExportarCsv';
import ExportarPdf from './components/ExportarCsv';
import ExportarXlsx from './components/ExportarXlsx';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/produtos" element={<VerProdutos />} />
        <Route path="/criarproduto" element={<CriarProduto/>} />
        <Route path="/buscarproduto" element={<BuscarProdutoPorId/>} />
        <Route path="/downloadcsv" element={<ExportarCsv/>} />
        <Route path="/downloadpdf" element={<ExportarPdf/>} />
        <Route path="/downloadxlsx" element={<ExportarXlsx/>} />
      </Routes>
    </Router>
  );
};

export default App;

