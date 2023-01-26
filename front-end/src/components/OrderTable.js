import PropTypes from 'prop-types';

export default function OrderTable({ shopCart }) {
  const tableHeader = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  return (
    <table>
      <thead>
        <tr>
          {tableHeader.map((description, index) => (
            <th key={ index }>{description}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {shopCart.map((itemCart, index) => (
          <tr
            key={ itemCart.id }
          >
            <td
              data-testId={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testId={ `customer_checkout__element-order-table-name-${index}` }
            >
              {itemCart.name}
            </td>
            <td
              data-testId={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {itemCart.quantity}
            </td>
            <td
              data-testId={ `customer_checkout__element-order-table-unit-price-${index}` }
            >
              {itemCart.price}
            </td>
            <td
              data-testId={ `customer_checkout__element-order-table-sub-total-${index}` }
            >
              {itemCart.price * itemCart.quantity}
            </td>
            <td>
              <button
                type="button"
                data-testId={ `customer_checkout__element-order-table-remove-${index}` }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  shopCart: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
};
