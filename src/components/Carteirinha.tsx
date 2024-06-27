import React from 'react';
import { Navigate } from 'react-router-dom';
import { FormValues } from './Formulario';
import './Carteirinha.css';
import carteirinhaPhoto from '../img/default-image.jpg';
import twitterHeaderPhoto from '../img/twitter_header_photo_2.png';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Carteirinha: React.FC<{ dados: FormValues | null }> = ({ dados }) => {
  if (!dados) {
    return <Navigate to="/" />;
  }

  const handleDownloadPDF = async () => {
    const element = document.getElementById('carteirinha');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size in mm
      pdf.save('carteirinha.pdf');
    }
  };

  return (
    <div id="carteirinha" className="carteirinha">
      <div className='yellowBar'></div>
      <header>
        <img src={twitterHeaderPhoto} alt="Header Photo" className="header-photo" />
      </header>
      <h2>Documento de Idetificação Estudantil</h2>
      <div className='informacoes'>
        <img src={carteirinhaPhoto} alt="Foto da Carteirinha" className="carteirinha-foto" />
        <div className="carteirinha-secao secao1">
          <p><strong>Nome</strong></p>
          <p>{dados.dadosPessoais.nome} {dados.dadosPessoais.sobrenome}</p>
          <p><strong>Data de Nascimento</strong></p>
          <p>{dados.dadosPessoais.dataNascimento}</p>
          <p><strong>CPF</strong></p>
          <p>{dados.dadosPessoais.cpf}</p>
          <p><strong>RG</strong></p>
          <p>{dados.dadosPessoais.rg}</p>
        </div>
        <div className="carteirinha-secao">
          <p><strong>Instituição</strong></p>
          <p>{dados.dadosAcademicos.instituicao}</p>
          {/* <p>{dados.dadosAcademicos.registroAcademico}</p> */}
          <p><strong>Curso</strong></p>
          <p>{dados.dadosAcademicos.curso}</p>
          <p><strong>Data de Início</strong></p>
          <p>{dados.dadosAcademicos.dataInicio}</p>
          <p><strong>Data de Término</strong></p>
          <p>{dados.dadosAcademicos.dataConclusao}</p>
        </div>
      </div>
      <button onClick={handleDownloadPDF} className="carteirinha-download-button">Ver Carteirinha</button>
    </div>
  );
};

export default Carteirinha;
