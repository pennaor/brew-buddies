import React from "react";

export function Login() {
  return (
    <main>
      <div>
        <div>
          <label htmlFor='email'>
            <p>Login</p>
            <input
              type='email'
              id='email'
              placeholder='digite seu email, ex:.email@email.com'
              data-testid='common_login__input-email'
            />
          </label>
          <label htmlFor='password'>
            <p>Senha</p>
            <input
              type='password'
              id='password'
              placeholder='digite sua senha...'
              data-testid='common_login__input-password'
            />
          </label>
          <button
            type='button'
            data-testid='common_login__button-login'
          >
            Login
          </button>
          <button
            type='button'
            data-testid='common_login__button-register'
          >
            Ainda não tenho conta
          </button>
        </div>
        <p
          data-testid='common_login__element-invalid-email'
        >
        </p>
      </div>
    </main>
  )
}