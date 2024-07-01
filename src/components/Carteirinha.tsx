import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { FormValues } from './Formulario';
import './Carteirinha.css';
import carteirinhaPhoto from '../img/default-image.jpg';
import twitterHeaderPhoto from '../img/twitter_header_photo_2.png';
import logo from '../img/logo-sem-fundo.png';
import qrCode from '../img/qr-code.png';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

Modal.setAppElement('#root');

const Carteirinha: React.FC<{ dados: FormValues | null }> = ({ dados }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (!dados) {
    return <Navigate to="/" />;
  }

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('carteirinha-modal');
    if (element) {
      const buttons = document.querySelectorAll('.divBtns');
      buttons.forEach(button => {
        if (button instanceof HTMLElement) {
          button.style.display = 'none';
        }
      });

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');

      const pdfWidth = window.innerWidth * 0.2;
      const pdfHeight = window.innerHeight * 0.5;

      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      pdf.save('carteirinha.pdf');

      buttons.forEach(button => {
        if (button instanceof HTMLElement) {
          button.style.display = 'flex';
        }
      });
    }
  };

  return (
    <div>
      <div id="carteirinha" className="carteirinha">
        <div className='yellowBar'></div>
        <header>
          <img src={twitterHeaderPhoto} alt="Header Photo" className="header-photo" />
        </header>
        <h2>Documento de Identificação Estudantil</h2>
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
        <button onClick={openModal} className="carteirinha-download-button">Ver Carteirinha</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Carteirinha Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div id="carteirinha-modal" className="carteirinha-modal">
          <header>
            <div className="header-photo2">
              <img src={logo} alt="Foto da Carteirinha" className="headerFoto" />
              <h1 className='headerCarteira'>SchoolPass</h1>
            </div>
          </header>
          <div className='informacoes2'>
            <div className='imgDiv'>
              <img src={carteirinhaPhoto} alt="Foto da Carteirinha" className="carteirinha-foto2" />
              <img src={qrCode} alt="QR Code" className="qrCode" />
            </div>
            <div className="carteirinha-secao2 secao2">
              <p><strong>{dados.dadosPessoais.nome} {dados.dadosPessoais.sobrenome}</strong></p>
              <p><strong>{dados.dadosAcademicos.instituicao}</strong></p>
              <p><strong>{dados.dadosAcademicos.curso}</strong></p>
              <p><strong>{dados.dadosPessoais.cpf}</strong></p>
              <p><strong>{dados.dadosPessoais.dataNascimento}</strong></p>
              <p><strong>{dados.dadosPessoais.rg}</strong></p>
              <p><strong>VALIDADE: {dados.dadosAcademicos.dataConclusao}</strong></p>
            </div>
          </div>
          <div className='divBtns'>
            <button onClick={handleDownloadPDF} className="carteirinha-download-button">Baixar</button>
            <button onClick={closeModal} className="carteirinha-close-button">Fechar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Carteirinha;
