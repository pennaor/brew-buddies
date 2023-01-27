import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
import { requestOrdersByClient } from '../services/requests';

export default function Orders() {
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      console.log(user.id);
      const response = await requestOrdersByClient(user.id);
      setOrders(response);
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

  useEffect(() => {
    setUser(getStorageData('user'));
    fetchOrders();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(orders);

  return (
    <div>
      <Header { ...user } />
      {orders.map((order) => (
        <OrderCard
          key={ order.id }
          order={ order }
        />
      ))}
    </div>
  );
}
