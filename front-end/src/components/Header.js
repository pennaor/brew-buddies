import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CUSTOMER_BUTTON = [
  {
    testId: 'customer_products__element-navbar-link-products',
    rota: '/customer/products',
    description: 'Produtos',
  },
  {
    testId: 'customer_products__element-navbar-link-orders',
    rota: '/customer/orders',
    description: 'Meus Pedidos',
  },
];

export default function Header({ name, role }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const buttonFactory = (buttons) => buttons.map((button) => (
    <button
      type="button"
      key={ button.description }
      data-testid={ button.testId }
      onClick={ () => navigate(button.rota) }
    >
      {button.description}
    </button>
  ));

  return (
    <nav>
      {role === 'customer' && buttonFactory(CUSTOMER_BUTTON)}
      <h2
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
      </h2>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => signOut() }
      >
        Sair
      </button>
    </nav>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
