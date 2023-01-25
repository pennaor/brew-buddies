import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header
      style={ { minWidth: '90%', padding: '0.5rem', backgroundColor: 'gray' } }
    >
      <nav
        style={ { display: 'flex', justifyContent: 'space-between', width: '100%' } }
      >
        <div
          style={ { display: 'flex' } }
        >
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => navigate('/customer/products') }
          >
            Produtos
          </button>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/customer/orders') }
          >
            Meus Pedidos
          </button>
        </div>
        <div
          style={ { display: 'flex' } }
        >
          <h2
            type="button"
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Fulano de tal
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
