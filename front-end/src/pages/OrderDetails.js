import { useEffect, useState } from 'react';
import { useHref } from 'react-router-dom';
import ClientOrderLabel from '../components/ClientOrderLabel';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import { requestChangeStatusOrder, requestOrderById } from '../services/requests';

export default function OrderDetails() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const history = useHref();
  const url = history.split('/');

  const fetchOrder = async (id) => {
    try {
      const response = await requestOrderById(id);
      setOrder(response);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStatusOrder = async () => {
    await requestChangeStatusOrder(url[3], 'Entregue');
    const newOrders = { ...order, status: 'Entregue' };
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
  console.log(order);
  return (
    <div>
      <Header { ...user } />
      <div>
        <h3>Detalhe do Pedido</h3>
        <ClientOrderLabel
          order={ order }
          changeStatusOrder={ changeStatusOrder }
        />
        <OrderTable
          productOrders={ order.products }
          page="customer_order_details"
        />
        <h1>
          Total: R$
          {' '}
          <span data-testid="customer_order_details__element-order-total-price">
            {sumCartTotal()}
          </span>
        </h1>
      </div>
    </div>
  );
}
