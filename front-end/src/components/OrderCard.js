import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function OrderCard({ order, page }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;

  const formatedDate = dayjs(saleDate).format('DD/MM/YYYY');

  return (
    <Link to={ `${id}` }>
      <div>
        <p>Pedido</p>
        <p data-testid={ `${page}__element-order-id-${id}` }>
          {id}
        </p>
      </div>
      <div>
        <div>
          <div>
            <p data-testid={ `${page}__element-delivery-status-${id}` }>
              {status}
            </p>
          </div>
          <p
            data-testid={ `${page}__element-order-date-${id}` }
          >
            {formatedDate}
          </p>
          <p>
            R$
            {' '}
            <span
              data-testid={ `${page}__element-card-price-${id}` }
            >
              {totalPrice.replace('.', ',')}
            </span>
          </p>
        </div>
        {
          page === 'seller_orders'
        && (
          <div>
            <p
              data-testid={ `seller_orders__element-card-address-${id}` }
            >
              {`${deliveryAddress}, ${deliveryNumber}`}
            </p>
          </div>
        )
        }
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  page: PropTypes.string.isRequired,
};
