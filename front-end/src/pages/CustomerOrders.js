import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
import { requestOrdersByClient } from '../services/requests';

export default function CustomerOrders() {
  const [user, setUser] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchOrders = async (id) => {
    try {
      const response = await requestOrdersByClient(id);
      setOrders(response);
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
          page="customer_orders"
        />
      ))}
    </div>
  );
}
