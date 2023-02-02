import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import { requestAllSellers, requestCreateOrder, setToken } from '../services/requests';

export default function CustomerCheckout() {
  const [user, setUser] = useState('');
  const [shopCart, setShopCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellersAvaible, setSellersAvaible] = useState([]);
  const [sellerId, setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');

  const navigate = useNavigate();

  const fetchSellers = async () => {
    try {
      const response = await requestAllSellers();
      setSellerId(response[0].id);
      setSellersAvaible(response);
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

  const removeItemCart = (itemId) => {
    const newShopCart = shopCart.filter((item) => item.id !== itemId);
    localStorage.setItem('shopCart', JSON.stringify([...newShopCart]));
    setShopCart(getStorageData('shopCart'));
  };

  const sumCartTotal = () => {
    const sum = shopCart.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0,
    );
    return sum.toFixed(2).replace('.', ',');
  };

  const createNewSeller = async () => {
    const products = shopCart.map(({ id, quantity }) => ({ productId: id, quantity }));
    const body = {
      sellerId,
      totalPrice: Number(sumCartTotal().replace(',', '.')),
      deliveryAddress,
      deliveryNumber,
      products,
    };

    try {
      setToken(user.token);
      const { saleId } = await requestCreateOrder(body);
      localStorage.removeItem('shopCart');
      navigate(`/customer/orders/${saleId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setUser(getStorageData('user'));
  }, []);

  useEffect(() => {
    setShopCart(getStorageData('shopCart'));
    fetchSellers();
    setLoading(false);

    return () => {
      setShopCart([]);
      setLoading(true);
    };
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Header { ...user } />
      <div>
        <h2>Finalizar Pedido</h2>
        <OrderTable
          productOrders={ shopCart }
          removeItem={ removeItemCart }
          page="customer_checkout"
        />
        <h1>
          Total: R$
          {' '}
          <span data-testid="customer_checkout__element-order-total-price">
            {sumCartTotal()}
          </span>
        </h1>
      </div>
      <div>
        <h2>Detalhes e Endereço para Entrega</h2>
        <div
          style={ {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          } }
        >
          <p>P. Vendedora Responsável</p>
          <p>Endereço</p>
          <p>Número</p>
          <label htmlFor="sellers">
            <select
              id="sellers"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => { setSellerId(target.value); } }
            >
              {sellersAvaible.map((sellerAvaible) => (
                <option
                  key={ sellerAvaible.id }
                  value={ sellerAvaible.id }
                >
                  {sellerAvaible.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="adress">
            <input
              id="adress"
              type="text"
              data-testid="customer_checkout__input-address"
              value={ deliveryAddress }
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
              placeholder="Rua da Oliveiras, São Francisco..."
            />
          </label>
          <label htmlFor="adress-number">
            <input
              id="adress-number"
              type="text"
              data-testid="customer_checkout__input-address-number"
              value={ deliveryNumber }
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
              placeholder="189"
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        onClick={ () => createNewSeller() }
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
