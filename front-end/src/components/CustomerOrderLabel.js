import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function CustomerOrderLabel({ order, changeStatusOrder }) {
  const formatedDate = dayjs(order.saleDate).format('DD/MM/YYYY');
  return (
    <div className="customerOrderLabel-container">
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
          {order.sellerName}
        </span>
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {`Data do pedido: ${formatedDate}`}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status-"
        className={
          (order.status === 'Pendente' && 'pendente')
          || (order.status === 'Preparando' && 'preparando')
          || (order.status === 'Em Trânsito' && 'em-transito')
          || 'entregue'
        }
      >
        {`Status: ${order.status}`}
      </p>
      <button
        type="button"
        data-testid="customer_order_details__button-delivery-check"
        onClick={ () => changeStatusOrder() }
        disabled={ order.status !== 'Em Trânsito' }
      >
        Marcar como entregue
      </button>
    </div>
  );
}

CustomerOrderLabel.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  changeStatusOrder: PropTypes.func.isRequired,
};
