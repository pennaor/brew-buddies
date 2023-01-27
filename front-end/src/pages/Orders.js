import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
import { requestOrdersByClient } from '../services/requests';

export default function Orders() {
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (id) => {
    console.log('ativou');
    try {
      const response = await requestOrdersByClient(id);
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
  }, []);

  useEffect(() => {
    fetchOrders(user.id);
    setLoading(false);
  }, [user]);

  if (loading) {
    return <Loading />;
  }

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
