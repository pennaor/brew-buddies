import React from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({ products }) {
  return (
    <div>
      { products.lenght === 0 ? (
        <h2>Não há produtos cadastrados</h2>
      ) : (
        products.map(({ id, name, price, urlImage }) => (
          <div
            key={ id }
          >
            <div>
              <p
                data-testid={ `customer_products__element-card-price-${id}` }
              >
                {price}
              </p>
              <img
                data-testid={ `customer_products__img-card-bg-image-${id}` }
                style={ { width: '60px' } }
                src={ urlImage }
                alt={ name }
              />
            </div>
            <div>
              <p
                data-testid={ `customer_products__element-card-title-${id}` }
              >
                {name}
              </p>
              <div>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-rm-item-${id}` }
                >
                  Remover
                </button>
                <label htmlFor="quantity">
                  <input
                    id="quantity"
                    data-testid={ `customer_products__input-card-quantity-${id}` }
                    placeholder="0"
                  />
                </label>
                <button
                  type="button"
                  data-testid={ `customer_products__button-card-add-item-${id}` }
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.objectOf({
      id: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
    }),
  ).isRequired,
};
