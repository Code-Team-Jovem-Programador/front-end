import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;





