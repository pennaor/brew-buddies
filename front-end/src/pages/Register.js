import React, { useState } from 'react';
import { IoIosBeer } from 'react-icons/io';
import { ImArrowLeft } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { requestRegister } from '../services/requests';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');
  const [registerError, setRegisterError] = useState('');

  const navigate = useNavigate();

  const validateStatusButton = () => {
    const emailRegexValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const minimumPasswordLength = 6;
    const minimumNameLength = 12;
    const nameValidator = name.length >= minimumNameLength;
    const emailValidator = emailRegexValidate.test(email);
    const passwordValidator = password.length >= minimumPasswordLength;
    return !(nameValidator && emailValidator && passwordValidator);
  };

  const handleRegister = async () => {
    try {
      const response = await requestRegister({ email, password, name });
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/customer/products');
    } catch (error) {
      setRegisterError(error.message);
    }
  };

  return (
    <main className="register-container">
      <a
        className="register-container-back"
        href="/login"
      >
        <ImArrowLeft />
        <p>Voltar</p>
      </a>
      <div className="register-container-content">
        <div className="register-container-content-title">
          <div>
            <h1>Brew</h1>
            <h1>Buddies</h1>
          </div>
          <IoIosBeer />
        </div>
        <div className="register-container-content-localName">
          <h2>Cadastro</h2>
        </div>
        <label htmlFor="name">
          <p>Nome</p>
          <input
            type="text"
            id="name"
            placeholder="Digite seu nome..."
            data-testid="common_register__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
        <label htmlFor="email">
          <p>Email</p>
          <input
            type="email"
            id="email"
            placeholder="Digite seu email..."
            data-testid="common_register__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <p>Senha</p>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha..."
            data-testid="common_register__input-password"
            value={ password }
            onChange={ ({ target }) => setPassoword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ validateStatusButton() }
          onClick={ handleRegister }
        >
          Cadastrar
        </button>
      </div>
      {registerError && (
        <p data-testid="common_register__element-invalid_register">{registerError}</p>
      )}
    </main>
  );
}
