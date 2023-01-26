import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';

const sellers = ['Juca Roberto', 'Patricia Daora', 'Osvaldo Monte'];

export default function Checkout() {
  const [user, setUser] = useState('');
  const [shopCart, setShopCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delivery, setDelivery] = useState([]);

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return [];
    }
    return data;
  };

  useEffect(() => {
    setUser(getStorageData('user'));
    setShopCart(getStorageData('shopCart'));
    setLoading(false);
  }, [setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header { ...user } />
      <div>
        <h2>Finalizar Pedido</h2>
        <OrderTable shopCart={ shopCart } />
        <h1>
          Total: R$
          {' '}
          <span>28,46</span>
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
            <select id="sellers" data-testId="customer_checkout__select-seller">
              {sellers.map((seller) => (
                <option key={ seller }>{seller}</option>
              ))}
            </select>
          </label>
          <label htmlFor="adress">
            <input
              id="adress"
              type="text"
              data-testId="customer_checkout__input-address"
            />
          </label>
          <label htmlFor="adress-number">
            <input
              id="adress-number"
              type="number"
              data-testId="customer_checkout__input-address-number"
            />
          </label>
        </div>
      </div>
      <button
        type="button"
        data-testId="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
