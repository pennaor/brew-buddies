import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function ClientOrderLabel({ order }) {
  const formatedDate = dayjs(order.saleDate).format('DD/MM/YYYY');
  return (
    <div>
      <p>
        PEDIDO
        {' '}
        <span
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { order.id }
        </span>
      </p>
      <p>
        P. Vend:
        {' '}
        <span
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          Fulana Pereira
        </span>
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {formatedDate}
      </p>
      <p
        data-testid="customer_order_details
        __element-order-details-label-delivery-status<index>"
      >
        {order.status}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

ClientOrderLabel.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
