import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { requestProducts } from '../services/requests';

export default function CustomerProducts() {
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
      console.log(error.message);
    }
  };

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null && storageName === 'user') {
      return navigate('/login');
    }
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
    } else {
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
    console.log(value);
    const nonExistentIndex = -1;
    const itemIndex = shopCart.findIndex((cartItem) => cartItem.id === product.id);

    if (itemIndex === nonExistentIndex && value !== 0) {
      console.log('chamou 1');
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...shopCart, { ...product, quantity: value }]),
      );
      setShopCart(getStorageData('shopCart'));
    } else if (value === 0) {
      const itemCart = shopCart[itemIndex];
      const cartItems = shopCart.filter((item) => item.id !== itemCart.id);
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...cartItems]),
      );
      setShopCart(getStorageData('shopCart'));
    } else {
      console.log('chamou 2');
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
  }, []);

  useEffect(() => {
    if (user.id) {
      setShopCart(getStorageData('shopCart'));
      fetchProducts();
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="products-container">
      <Header { ...user } />
      <div className="products-container-content">
        {products.length === 0 ? (
          <h2
            data-testid="notProducts"
          >
            Não há produtos cadastrados
          </h2>
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
      </div>
      <button
        type="button"
        className="products-container-shopCart"
        data-testid="customer_products__button-cart"
        onClick={ () => navigate('/customer/checkout') }
        disabled={ sumCartTotal() === '0,00' }
      >
        <div
          className="shopCart-icon"
        >
          { sumCartTotal() === '0,00' ? (
            <MdOutlineRemoveShoppingCart />
          ) : (
            <MdOutlineShoppingCart />
          ) }
        </div>
        <div
          className="shopCart-total"
        >
          <p data-testid="customer_products__checkout-bottom-value">
            Total:
          </p>
          <p data-testid="customer_products__checkout-bottom-value">
            {`R$: ${sumCartTotal()}`}
          </p>
        </div>
      </button>
    </div>
  );
}
