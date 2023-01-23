import React, { useState } from 'react';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassoword] = useState('');

  const validateStatusButton = () => {
    const regex = /\S+@\S+.\S+/;
    const minimumPasswordLength = 6;
    const emailValidator = regex.test(login);
    const passwordValidator = password.length >= minimumPasswordLength;
    return !(emailValidator && passwordValidator);
  };

  return (
    <main>
      <div>
        <div>
          <label htmlFor="email">
            <p>Login</p>
            <input
              type="email"
              id="email"
              placeholder="digite seu email, ex:.email@email.com"
              data-testid="common_login__input-email"
              value={ login }
              onChange={ ({ target }) => setLogin(target.value) }
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
          >
            Login
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </button>
        </div>
        <p
          data-testid="common_login__element-invalid-email"
        />
      </div>
    </main>
  );
}
