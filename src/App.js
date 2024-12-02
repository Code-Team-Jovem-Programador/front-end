import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProductsPage from "./components/ProductsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<LoginForm />} />
        <Route path="/produtos" element={<VerProdutos />} />
        <Route path="/criarproduto" element={<CriarProdutos />} />
        <Route path="/buscarproduto" element={<BuscarProdutoPorId />} />
        <Route path="/downloadcsv" element={<ExportarCsv />} />
        <Route path="/downloadpdf" element={<ExportarPdf />} />
        <Route path="/downloadxlsx" element={<Exportarxlsx />} />
        
      </Routes>
    </Router>
  );
}

export default App;





