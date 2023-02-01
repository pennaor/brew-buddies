import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
import { requestOrdersBySeller } from '../services/requests';

export default function SellerOrders() {
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (id) => {
    try {
      const response = await requestOrdersBySeller(id);
      console.log(response);
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
    if (user.id) {
      fetchOrders(user.id);
      setLoading(false);
    }
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
          page="seller_orders"
        />
      ))}
    </div>
  );
}
