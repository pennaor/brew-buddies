import PropTypes from 'prop-types';

export default function OrderCard({ order }) {
  console.log(order);
  const { id, status, saleDate, totalPrice } = order;
  return (
    <div>
      <div>
        <p>
          Pedido
        </p>
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {}
        </p>
      </div>
      <div>
        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          {status}
        </p>
      </div>
      <div>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          {saleDate}
        </p>
        <p>
          R$
          {' '}
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            {totalPrice}
          </span>
        </p>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
};
