import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

export default function Products() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState([]);
  const [shopCart, setShopCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const removeItemCart = (product) => {
    const itemIndex = shopCart.findIndex((item) => item.id === product.id);
    const itemCart = shopCart[itemIndex];

    if (itemCart.quantity === 1) {
      const cartItems = shopCart.filter((item) => item.id !== itemCart.id);
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...cartItems]),
      );
      setShopCart(getStorageData('shopCart'));
    } else if (itemCart.quantity > 1) {
      const cartItems = shopCart;
      cartItems[itemIndex].quantity -= 1;
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...cartItems]),
      );
      setShopCart(getStorageData('shopCart'));
    }
  };

  const addItemCart = (product) => {
    const nonExistentIndex = -1;
    const itemIndex = shopCart.findIndex((cartItem) => cartItem.id === product.id);

    if (itemIndex === nonExistentIndex) {
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...shopCart, { ...product, quantity: 1 }]),
      );
      setShopCart(getStorageData('shopCart'));
    } else {
      const cartItems = shopCart;
      cartItems[itemIndex].quantity += 1;
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...cartItems]),
      );
      setShopCart(getStorageData('shopCart'));
    }
  };

  const updateItemCart = (product, value) => {
    const nonExistentIndex = -1;
    const itemIndex = shopCart.findIndex((cartItem) => cartItem.id === product.id);

    if (itemIndex === nonExistentIndex) {
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...shopCart, { ...product, quantity: value }]),
      );
      setShopCart(getStorageData('shopCart'));
    } else {
      const cartItems = shopCart;
      cartItems[itemIndex].quantity = value;
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...cartItems]),
      );
      setShopCart(getStorageData('shopCart'));
    }
  };

  const sumCartTotal = () => {
    const sum = shopCart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
    return sum.toFixed(2).replace('.', ',');
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
              removeItemCart={ removeItemCart }
              updateItemCart={ updateItemCart }
            />
          ))
        )}
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ sumCartTotal() === '0,00' }
        >
          Ver Carrinho: R$
          {' '}
          <span data-testid="customer_products__checkout-bottom-value">
            {sumCartTotal()}
          </span>
        </button>
      </div>
    </div>
  );
}
