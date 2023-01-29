import PropTypes from 'prop-types';
import { useState } from 'react';

export default function FormUserRegistration({ createUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');

  const validateStatusButton = () => {
    const emailRegexValidate = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const minimumPasswordLength = 6;
    const minimumNameLength = 12;
    const nameValidator = name.length >= minimumNameLength;
    const emailValidator = emailRegexValidate.test(email);
    const passwordValidator = password.length >= minimumPasswordLength;
    return !(nameValidator && emailValidator && passwordValidator);
  };

  return (
    <form>
      <label htmlFor="name">
        <p>Nome</p>
        <input
          type="text"
          id="name"
          placeholder="Nome e sobrenome..."
          data-testid="admin_manage__input-name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
      </label>
      <label htmlFor="email">
        <p>Email</p>
        <input
          type="email"
          id="email"
          placeholder="Digite o email..."
          data-testid="admin_manage__input-email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        <p>Senha</p>
        <input
          type="password"
          id="password"
          placeholder="Sua senha..."
          data-testid="admin_manage__input-password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <label htmlFor="role">
        <p>Tipo</p>
        <select
          id="role"
          data-testid="admin_manage__select-role"
          value={ role }
          onChange={ ({ target }) => { setRole(target.value); } }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
          <option value="administrator">Administrador</option>
        </select>
      </label>
      <button
        type="submit"
        data-testid="admin_manage__button-register"
        disabled={ validateStatusButton() }
        onClick={ (event) => createUser(event, {
          name,
          email,
          password,
          role,
        }) }
      >
        CADASTRAR
      </button>
    </form>
  );
}

FormUserRegistration.propTypes = {
  createUser: PropTypes.func.isRequired,
};
