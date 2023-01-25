import { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    setUser(storageUser);
  }, []);

  return (
    <div>
      <Header user={ user } />
      <div>
        <ProductCard />
        <button
          type="button"
          data-testid="customer_products__button-cart"
        >
          Ver Carrinho: R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            28,46
          </span>
        </button>
      </div>
    </div>
  );
}
