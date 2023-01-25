import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CUSTOMER_BUTTON_INFO = [
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
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navButtonFactory = (buttons) => buttons.map((button) => (
    <button
      key={ button.description }
      type="button"
      data-testid={ button.testId }
      onClick={ () => navigate(`${button.rota}`) }
    >
      {button.description}
    </button>
  ));

  return (
    <header
      style={ { minWidth: '90%', padding: '0.5rem', backgroundColor: 'gray' } }
    >
      <nav
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        } }
      >
        <div style={ { display: 'flex' } }>
          {role === 'customer' && navButtonFactory(CUSTOMER_BUTTON_INFO)}
        </div>
        <div style={ { display: 'flex' } }>
          <h2
            type="button"
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
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
