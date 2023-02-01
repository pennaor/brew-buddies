import { useEffect, useState } from 'react';
import { useHref } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import SellerOrderLabel from '../components/SellerOrderLabel';
import { requestChangeStatusOrder, requestOrderById } from '../services/requests';

export default function SellerOrderDetails() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const history = useHref();
  const url = history.split('/');

  const fetchOrder = async (id) => {
    try {
      const response = await requestOrderById(id);
      console.log(response);
      setOrder(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusOrder = async (status) => {
    await requestChangeStatusOrder(url[3], status);
    const newOrders = { ...order, status };
    setOrder(newOrders);
  };

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return [];
    }
    return data;
  };

  const sumCartTotal = () => {
    const sum = order.products.reduce(
      (acc, curr) => acc + curr.quantity * curr.price,
      0,
    );
    return sum.toFixed(2).replace('.', ',');
  };

  useEffect(() => {
    setUser(getStorageData('user'));
    fetchOrder(url[3]);
    setLoading(false);
  }, []);

  if (loading || !order.id) {
    return <Loading />;
  }

  return (
    <div>
      <Header { ...user } />
      <div>
        <h3>Detalhe do Pedido</h3>
        <SellerOrderLabel
          order={ order }
          changeStatusOrder={ changeStatusOrder }
        />
        <OrderTable
          productOrders={ order.products }
          page="seller_order_details"
        />
        <h1>
          Total: R$
          {' '}
          <span data-testid="seller_order_details__element-order-total-price">
            {sumCartTotal()}
          </span>
        </h1>
      </div>
    </div>
  );
}
