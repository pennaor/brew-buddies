import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

export default function Products() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await requestProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    setUser(storageUser);
    fetchProducts();
  }, []);

  if (user === '') {
    return (
      <Loading />
    );
  }

  console.log(products);

  return (
    <div>
      <Header { ...user } />
      <div>
        {
          products === null ? (
            <Loading />
          ) : (
            <ProductCard products={ products } />
          )
        }
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
