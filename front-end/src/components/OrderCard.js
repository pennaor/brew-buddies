import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function OrderCard({ order }) {
  const { id, status, saleDate, totalPrice } = order;

  const formatedDate = dayjs(saleDate).format('DD/MM/YYYY');

  return (
    <Link to={ `${id}` }>
      <div>
        <p>Pedido</p>
        <p data-testid={ `customer_orders__element-order-id-${id}` }>
          {id}
        </p>
      </div>
      <div>
        <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
          {status}
        </p>
      </div>
      <div>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {formatedDate}
        </p>
        <p>
          R$
          {' '}
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {totalPrice.replace('.', ',')}
          </span>
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
