import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

export default function Products() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await requestProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return [];
    }
    return data;
  };

  const addItemCart = (product) => {
    const nonExistentIndex = -1;
    const productIndex = shopCart.findIndex((cartItem) => cartItem.id === product.id);

    if (productIndex === nonExistentIndex) {
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...shopCart, { ...product, quantity: 1 }]),
      );
      setShopCart(getStorageData('shopCart'));
    } else {
      const allProducts = shopCart;
      allProducts[productIndex].quantity += 1;
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...allProducts]),
      );
      setShopCart(getStorageData('shopCart'));
    }
  };

  useEffect(() => {
    setUser(getStorageData('user'));
    setShopCart(getStorageData('shopCart'));
    fetchProducts();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header { ...user } />
      <div>
        {products.lenght === 0 ? (
          <h2>Não há produtos cadastrados</h2>
        ) : (
          products.map((product) => (
            <ProductCard
              key={ product.id }
              shopCart={ shopCart }
              product={ product }
              addItemCart={ addItemCart }
              changeShopCart={ setShopCart }
              getStorageData={ getStorageData }
            />
          ))
        )}
        <button type="button" data-testid="customer_products__button-cart">
          Ver Carrinho: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            28,46
          </span>
        </button>
      </div>
    </div>
  );
}
