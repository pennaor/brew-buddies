import PropTypes from 'prop-types';
import dayjs from 'dayjs';

export default function SellerOrderLabel({ order, changeStatusOrder }) {
  const formatedDate = dayjs(order.saleDate).format('DD/MM/YYYY');
  console.log('seller', order.status);
  return (
    <div>
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
        {formatedDate}
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {order.status}
      </p>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
        onClick={ () => changeStatusOrder('Preparando') }
        disabled={ order.status !== 'Pendente' }
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
        onClick={ () => changeStatusOrder('Em Trânsito') }
        disabled={ order.status !== 'Preparando' }
      >
        SAIU PARA ENTREGA
      </button>
    </div>
  );
}

SellerOrderLabel.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  changeStatusOrder: PropTypes.func.isRequired,
};
