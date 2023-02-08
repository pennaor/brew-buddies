import { useEffect, useState } from 'react';
import { useNavigate, useHref } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import SellerOrderLabel from '../components/SellerOrderLabel';
import { requestChangeStatusOrder, requestOrderById } from '../services/requests';

export default function SellerOrderDetails() {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});

  const navigate = useNavigate();
  const history = useHref();
  const url = history.split('/');

  const fetchOrder = async (id) => {
    try {
      const response = await requestOrderById(id);
      setOrder(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeStatusOrder = async (status) => {
    try {
      await requestChangeStatusOrder(url[3], status);
      const newOrders = { ...order, status };
      setOrder(newOrders);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return navigate('/login');
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
  }, []);

  useEffect(() => {
    if (user.id) {
      fetchOrder(url[3]);
      setLoading(false);
    }
  }, [user]);

  if (loading || !order.id) {
    return <Loading />;
  }

  return (
    <div className="sellerOrderDetails-container">
      <Header { ...user } />
      <div className="sellerOrderDetails-container-content">
        <h2>Detalhes do Pedido</h2>
        <SellerOrderLabel
          order={ order }
          changeStatusOrder={ changeStatusOrder }
        />
        <div className="sellerOrderDetails-container-content-table">
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
    </div>
  );
}
