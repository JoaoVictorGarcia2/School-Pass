import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';
import twitterHeaderPhoto from '../img/twitter_header_photo_2.png';

export interface FormValues {
  dadosPessoais: {
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    cpf: string;
    rg: string;
  };
  dadosAcademicos: {
    instituicao: string;
    registroAcademico: string;
    curso: string;
    dataInicio: string;
    dataConclusao: string;
  };
}

const schema = z.object({
  dadosPessoais: z.object({
    nome: z.string().nonempty(),
    sobrenome: z.string().nonempty(),
    dataNascimento: z.string().nonempty(),
    cpf: z.string().nonempty(),
    rg: z.string().nonempty(),
  }),
  dadosAcademicos: z.object({
    instituicao: z.string().nonempty(),
    registroAcademico: z.string().nonempty(),
    curso: z.string().nonempty(),
    dataInicio: z.string().nonempty(),
    dataConclusao: z.string().nonempty(),
  }),
});

interface FormularioProps {
  onSubmit: (dados: FormValues) => void;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmitForm: SubmitHandler<FormValues> = (formData) => {
    onSubmit(formData);
    navigate('/carteirinhaoa');
  };

  const applyCPFFormat = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="formulario">
      <div className='yellowBar'></div>
      <header>
        <img src={twitterHeaderPhoto} alt="Header Photo" className="header-photo" />
      </header>
      <h2>Monte a sua Carteirinha de Estudante preenchendo o formulário abaixo.</h2>
      <div className="formulario-secao">
        <h2>Dados Pessoais</h2>
        <div className="formulario-linha linha1">
          <div className="formulario-campo">
            <label htmlFor="nome">Nome:</label>
            <Controller
              name="dadosPessoais.nome"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="nome" placeholder="Digite o seu nome" className={errors.dadosPessoais?.nome ? 'input-error' : ''} />
              )}
            />
            {errors.dadosPessoais?.nome && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <Controller
              name="dadosPessoais.sobrenome"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="sobrenome" placeholder="Digite o seu sobrenome" className={errors.dadosPessoais?.sobrenome ? 'input-error' : ''} />
              )}
            />
            {errors.dadosPessoais?.sobrenome && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="dataNascimento">Data de Nascimento:</label>
            <Controller
              name="dadosPessoais.dataNascimento"
              control={control}
              render={({ field }) => (
                <input {...field} type="date" id="dataNascimento" placeholder="Data de Nascimento" className={errors.dadosPessoais?.dataNascimento ? 'input-error' : ''} />
              )}
            />
            {errors.dadosPessoais?.dataNascimento && <span className="error-message">Campo obrigatório</span>}
          </div>
        </div>
        <div className="formulario-linha linha2">
          <div className="formulario-campo">
            <label htmlFor="cpf">CPF:</label>
            <Controller
              name="dadosPessoais.cpf"
              control={control}
              render={({ field }) => (
                <InputMask
                  {...field}
                  mask="999.999.999-99"
                  id="cpf"
                  placeholder="___.___.___-__"
                  className={errors.dadosPessoais?.cpf ? 'input-error' : ''}
                  onChange={(e) => field.onChange(applyCPFFormat(e.target.value))}
                />
              )}
            />
            {errors.dadosPessoais?.cpf && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="rg">RG:</label>
            <Controller
              name="dadosPessoais.rg"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="rg" placeholder="___.___.___-__" className={errors.dadosPessoais?.rg ? 'input-error' : ''} />
              )}
            />
            {errors.dadosPessoais?.rg && <span className="error-message">Campo obrigatório</span>}
          </div>
        </div>
      </div>

      <div className="formulario-secao">
        <h2>Dados Acadêmicos</h2>
        <div className="formulario-linha">
          <div className="formulario-campo">
            <label htmlFor="instituicao">Nome da Instituição:</label>
            <Controller
              name="dadosAcademicos.instituicao"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="instituicao" placeholder="Digite o nome da Instituição" className={errors.dadosAcademicos?.instituicao ? 'input-error' : ''} />
              )}
            />
            {errors.dadosAcademicos?.instituicao && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="registroAcademico">Registro Acadêmico:</label>
            <Controller
              name="dadosAcademicos.registroAcademico"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="registroAcademico" placeholder="Digite o RA" className={errors.dadosAcademicos?.registroAcademico ? 'input-error' : ''} />
              )}
            />
            {errors.dadosAcademicos?.registroAcademico && <span className="error-message">Campo obrigatório</span>}
          </div>
        </div>
        <div className="formulario-linha linha1">
          <div className="formulario-campo">
            <label htmlFor="curso">Curso:</label>
            <Controller
              name="dadosAcademicos.curso"
              control={control}
              render={({ field }) => (
                <input {...field} type="text" id="curso" placeholder="Digite o nome do curso" className={errors.dadosAcademicos?.curso ? 'input-error' : ''} />
              )}
            />
            {errors.dadosAcademicos?.curso && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="dataInicio">Data de Início:</label>
            <Controller
              name="dadosAcademicos.dataInicio"
              control={control}
              render={({ field }) => (
                <input {...field} type="date" id="dataInicio" placeholder="Data de Início" className={errors.dadosAcademicos?.dataInicio ? 'input-error' : ''} />
              )}
            />
            {errors.dadosAcademicos?.dataInicio && <span className="error-message">Campo obrigatório</span>}
          </div>
          <div className="formulario-campo">
            <label htmlFor="dataConclusao">Data de Conclusão:</label>
            <Controller
              name="dadosAcademicos.dataConclusao"
              control={control}
              render={({ field }) => (
                <input {...field} type="date" id="dataConclusao" placeholder="Data de Conclusão" className={errors.dadosAcademicos?.dataConclusao ? 'input-error' : ''} />
              )}
            />
            {errors.dadosAcademicos?.dataConclusao && <span className="error-message">Campo obrigatório</span>}
          </div>
        </div>
      </div>
      <button type="submit" className='btn'>Enviar</button>
    </form>
  );
};

export default Formulario;
