import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { FormValues } from './Formulario';
import './Carteirinha.css';

const Carteirinha: React.FC<{ dados: FormValues | null }> = ({ dados }) => {
  if (!dados) {
    return <Navigate to="/" />;
  }

  return (
    <div className="carteirinha">
      <h2>Carteirinha de Estudante</h2>
      <div className="carteirinha-secao">
        <h3>Dados Pessoais</h3>
        <p><strong>Nome:</strong> {dados.dadosPessoais.nome}</p>
        <p><strong>Sobrenome:</strong> {dados.dadosPessoais.sobrenome}</p>
        <p><strong>Data de Nascimento:</strong> {dados.dadosPessoais.dataNascimento}</p>
        <p><strong>CPF:</strong> {dados.dadosPessoais.cpf}</p>
        <p><strong>RG:</strong> {dados.dadosPessoais.rg}</p>
      </div>
      <div className="carteirinha-secao">
        <h3>Dados Acadêmicos</h3>
        <p><strong>Nome da Instituição:</strong> {dados.dadosAcademicos.instituicao}</p>
        <p><strong>Registro Acadêmico:</strong> {dados.dadosAcademicos.registroAcademico}</p>
        <p><strong>Curso:</strong> {dados.dadosAcademicos.curso}</p>
        <p><strong>Data de Início:</strong> {dados.dadosAcademicos.dataInicio}</p>
        <p><strong>Data de Conclusão:</strong> {dados.dadosAcademicos.dataConclusao}</p>
      </div>
    </div>
  );
};

export default Carteirinha;
