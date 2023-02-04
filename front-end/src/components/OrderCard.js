/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function OrderCard({ order, page }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;

  const formatedDate = dayjs(saleDate).format('DD/MM/YYYY');

  return (
    <Link
      to={ `${id}` }
      className="orderCard-container"
    >
      <div
        className="orderCard-container-content"
      >
        <div className="orderCard-content-order">
          <p>Pedido</p>
          <p data-testid={ `${page}__element-order-id-${id}` }>
            {id}
          </p>
        </div>
        <div
          className={
            `orderCard-content-status 
          ${(order.status === 'Pendente' && 'pendente')
          || (order.status === 'Preparando' && 'preparando')
          || (order.status === 'Em Trânsito' && 'em-transito')
          || 'entregue'}`
          }

        >
          <p
            data-testid={ `${page}__element-delivery-status-${id}` }
          >
            {status}
          </p>
        </div>
        <div className="orderCard-content-date-price">
          <p
            data-testid={ `${page}__element-order-date-${id}` }
          >
            {formatedDate}
          </p>
          <p
            data-testid={ `${page}__element-card-price-${id}` }
          >
            {`R$ ${totalPrice.replace('.', ',')}`}
          </p>
        </div>
      </div>
      {
        page === 'seller_orders'
        && (
          <div className="orderCard-content-address">
            <p
              data-testid={ `seller_orders__element-card-address-${id}` }
            >
              {`Endereço: ${deliveryAddress}, ${deliveryNumber}`}
            </p>
          </div>
        )
      }
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  page: PropTypes.string.isRequired,
};
