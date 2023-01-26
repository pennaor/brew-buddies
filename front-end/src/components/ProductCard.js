import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const nonExistentIndex = -1;

export default function ProductCard({
  product,
  shopCart,
  addItemCart,
  changeShopCart,
  getStorageData,
}) {
  const [quantity, setQuantity] = useState(0);
  const { id, name, price, urlImage } = product;

  const productIndex = shopCart.findIndex((item) => item.id === product.id);

  const changeQuantity = () => {
    if (productIndex === nonExistentIndex) {
      setQuantity(0);
    } else {
      setQuantity(shopCart[productIndex].quantity);
    }
  };

  function teste(value) {
    setQuantity(value);
    if (productIndex === -1) {
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...shopCart, { ...product, quantity: value }]),
      );
      changeShopCart(getStorageData('shopCart'));
    } else {
      const allProducts = shopCart;
      allProducts[productIndex].quantity = value;
      localStorage.setItem(
        'shopCart',
        JSON.stringify([...allProducts]),
      );
      changeShopCart(getStorageData('shopCart'));
    }
  }

  useEffect(() => {
    changeQuantity();
  }, [shopCart, changeQuantity]);

  return (
    <div key={ id }>
      <div>
        <p data-testid={ `customer_products__element-card-price-${id}` }>
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
        <p data-testid={ `customer_products__element-card-title-${id}` }>
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
              type="number"
              data-testid={ `customer_products__input-card-quantity-${id}` }
              placeholder="0"
              value={ quantity }
              onChange={ ({ target }) => teste(Number(target.value)) }
            />
          </label>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ () => addItemCart(product) }
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.objectOf(PropTypes.any.isRequired).isRequired,
  shopCart: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  addItemCart: PropTypes.func.isRequired,
  changeShopCart: PropTypes.func.isRequired,
  getStorageData: PropTypes.func.isRequired,
};
