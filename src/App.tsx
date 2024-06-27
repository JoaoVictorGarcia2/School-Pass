import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formulario, { FormValues } from './components/Formulario';
import Carteirinha from './components/Carteirinha';

const App: React.FC = () => {
  const [dados, setDados] = useState<FormValues | null>(null);

  const handleFormSubmit = (dados: FormValues) => {
    setDados(dados);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario onSubmit={handleFormSubmit} />} />
        <Route path="/carteirinha" element={<Carteirinha dados={dados} />} />
      </Routes>
    </Router>
  );
};

export default App;
