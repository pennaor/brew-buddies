import React from 'react';
import PropTypes from 'prop-types';

const CUSTOMER_ANCOR_INFO = [
  {
    tesdId: 'customer_products__element-navbar-link-products',
    rota: '/customer/products',
    description: 'Produtos',
  },
  {
    tesdId: 'customer_products__element-navbar-link-orders',
    rota: '/customer/orders',
    description: 'Meus Pedidos',
  },
];

export default function Header({ name, role }) {
  const signOut = () => {
    localStorage.removeItem('user');
  };

  const navAncorFactory = (buttons) => buttons.map((button) => (
    <a
      href={ button.rota }
      key={ button.description }
      data-testid={ button.testId }
    >
      {button.description}
    </a>
  ));

  return (
    <nav>
      {role === 'customer' && navAncorFactory(CUSTOMER_ANCOR_INFO)}
      <h2
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
      </h2>
      <a
        href="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => signOut() }
      >
        Sair
      </a>
    </nav>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
