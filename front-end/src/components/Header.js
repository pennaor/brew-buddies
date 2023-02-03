import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useHref } from 'react-router-dom';

const DEFAULT_BUTTON_TESTID = 'customer_products__element-navbar-link-orders';

const CUSTOMER_BUTTON = [
  {
    testId: 'customer_products__element-navbar-link-products',
    rota: '/customer/products',
    description: 'Produtos',
  },
  {
    testId: DEFAULT_BUTTON_TESTID,
    rota: '/customer/orders',
    description: 'Meus Pedidos',
  },
];

const SELLER_BUTTON = [
  {
    testId: DEFAULT_BUTTON_TESTID,
    rota: '/seller/orders',
    description: 'Produtos',
  },
];

const ADMIN_BUTTON = [
  {
    testId: DEFAULT_BUTTON_TESTID,
    rota: '/admin/manage',
    description: 'Gerenciar Usuários',
  },
];

export default function Header({ name, role }) {
  const navigate = useNavigate();
  const history = useHref();

  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const buttonFactory = (buttons) => buttons.map((button) => (
    <button
      type="button"
      key={ button.description }
      data-testid={ button.testId }
      disabled={ history.includes(button.rota) }
      onClick={ () => navigate(button.rota) }
    >
      {button.description}
    </button>
  ));

  return (
    <header className="header-container">
      <nav className="header-container-content">
        <div className="header-container-content-buttons">
          <div>
            {role === 'customer' && buttonFactory(CUSTOMER_BUTTON)}
            {role === 'seller' && buttonFactory(SELLER_BUTTON)}
            {role === 'administrator' && buttonFactory(ADMIN_BUTTON)}
          </div>
        </div>
        <div className="header-container-content-logo">
          <div>
            <h2>Brew Buddies</h2>
            <img src="/logo-brewBuddies.png" alt="homem com caneca de cerveja" />
          </div>
        </div>
        <div className="header-container-content-logout">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {name}
          </p>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => signOut() }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
