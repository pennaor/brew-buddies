import React, { useEffect, useState } from 'react';
import { IoIosBeer } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { requestLogin } from '../services/requests';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const pathChanger = (role) => {
    if (role === 'administrator') {
      navigate('/admin/manage');
    } else if (role === 'seller') {
      navigate('/seller/orders');
    } else {
      navigate('/customer/products');
    }
  };

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data !== null) {
      return pathChanger(data.role);
    }
  };

  const validateStatusButton = () => {
    const emailRegexValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const minimumPasswordLength = 6;
    const emailValidator = emailRegexValidate.test(email);
    const passwordValidator = password.length >= minimumPasswordLength;
    return !(emailValidator && passwordValidator);
  };

  const handleLogin = async () => {
    try {
      const response = await requestLogin({ email, password });
      localStorage.setItem('user', JSON.stringify(response));
      pathChanger(response.role);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  useEffect(() => {
    getStorageData('user');
  }, []);

  return (
    <main className="login-container">
      <div className="login-container-content">
        <div className="login-container-content-title">
          <div>
            <h1>Brew</h1>
            <h1>Buddies</h1>
          </div>
          <IoIosBeer />
        </div>
        <label htmlFor="email">
          <p>Login</p>
          <input
            type="email"
            id="email"
            placeholder="digite seu email..."
            data-testid="common_login__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password">
          <p>Senha</p>
          <input
            type="password"
            id="password"
            placeholder="digite sua senha..."
            data-testid="common_login__input-password"
            value={ password }
            onChange={ ({ target }) => setPassoword(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ validateStatusButton() }
          onClick={ handleLogin }
        >
          Entrar
        </button>
        <div className="login-container-content-register">
          <p>Não tem uma conta ainda?</p>
          <a
            data-testid="common_login__button-register"
            href="/register"
          >
            Cadastre-se
          </a>
        </div>
      </div>
      {loginError && (
        <p
          data-testid="common_login__element-invalid-email"
        >
          Login inválido
        </p>
      )}
    </main>
  );
}
