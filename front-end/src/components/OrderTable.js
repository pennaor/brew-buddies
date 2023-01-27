import PropTypes from 'prop-types';

export default function OrderTable({ shopCart, removeItem }) {
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
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-name-${index}` }
            >
              {itemCart.name}
            </td>
            <td
              data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
            >
              {itemCart.quantity}
            </td>
            <td>
              {'R$ '}
              <span
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {(itemCart.price)
                  .toString()
                  .replace('.', ',')}
              </span>
            </td>
            <td>
              {'R$ '}
              <span
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {(itemCart.price * itemCart.quantity)
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}
              </span>
            </td>
            <td>
              <button
                name={ itemCart.id }
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                onClick={ ({ target }) => removeItem(Number(target.name)) }
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
  removeItem: PropTypes.func.isRequired,
};
