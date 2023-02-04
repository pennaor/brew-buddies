import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function SellerOrderLabel({ order, changeStatusOrder }) {
  const formatedDate = dayjs(order.saleDate).format('DD/MM/YYYY');
  return (
    <div className="sellerOrderLabel-container">
      <p>
        PEDIDO
        {' '}
        <span
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { order.id }
        </span>
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {`Data do pedido: ${formatedDate}`}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
        className={
          (order.status === 'Pendente' && 'pendente')
          || (order.status === 'Preparando' && 'preparando')
          || (order.status === 'Em Trânsito' && 'em-transito')
          || 'entregue'
        }
      >
        {`Status: ${order.status}`}
      </p>
      <div>
        <button
          type="button"
          className="button-preparing"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => changeStatusOrder('Preparando') }
          disabled={ order.status !== 'Pendente' }
        >
          Preparar pedido
        </button>
        <button
          type="button"
          className="button-dispatch"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => changeStatusOrder('Em Trânsito') }
          disabled={ order.status !== 'Preparando' }
        >
          Saiu para entrega
        </button>
      </div>
    </div>
  );
}

SellerOrderLabel.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  changeStatusOrder: PropTypes.func.isRequired,
};
