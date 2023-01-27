export default function OrderCard() {
  const id = 1;
  return (
    <div>
      <div>
        <p>
          Pedido
        </p>
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          0001
        </p>
      </div>
      <div>
        <p
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          PENDENTE
        </p>
      </div>
      <div>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          08/04/21
        </p>
        <p>
          R$
          {' '}
          <span
            data-testid={ `customer_orders__element-card-price-${id}` }
          >
            23,80
          </span>
        </p>
      </div>
    </div>
  );
}
