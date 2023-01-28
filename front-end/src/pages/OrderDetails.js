import { useEffect, useState } from 'react';
import { useHref } from 'react-router-dom';
import ClientOrderLabel from '../components/ClientOrderLabel';
import Header from '../components/Header';
import Loading from '../components/Loading';
import OrderTable from '../components/OrderTable';
import { requestOrderById } from '../services/requests';

const shopCart = {
  id: 1,
  sellerName: 'tiazinha',
  totalPrice: '10',
  deliveryAddress: 'Rua dos bobos',
  deliveryNumber: '369',
  status: 'Entregue',
  saleDate: '1994-06-21T00:00:00.000Z',
  products: [
    { id: 1, name: 'skol', price: 5.00, quantity: 8 },
    { id: 2, name: 'coca', price: 4.00, quantity: 2 },
    { id: 3, name: 'fanta', price: 2.00, quantity: 1 },
  ],
};

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

  const getStorageData = (storageName) => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data === null) {
      return [];
    }
    return data;
  };

  const sumCartTotal = () => {
    const sum = shopCart.products.reduce(
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header { ...user } />
      <div>
        <h3>Detalhe do Pedido</h3>
        <ClientOrderLabel
          order={ order }
        />
        <OrderTable
          productOrders={ shopCart.products }
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
