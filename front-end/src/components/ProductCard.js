export default function ProductCard() {
  return (
    <div>
      <div>
        <p
          data-testid="customer_products__element-card-price-<id>"
        >
          R$ 4,49
        </p>
        <img
          data-testid="customer_products__img-card-bg-image-<id>"
          style={ { width: '60px' } }
          src="https://m.media-amazon.com/images/I/71Eyl+qZpxL._AC_SY741_.jpg"
          alt="Jagermeister"
        />
      </div>
      <div>
        <p
          data-testid="customer_products__element-card-title-<id>"
        >
          Jagermeister
        </p>
        <div>
          <button
            type="button"
            data-testid="customer_products__button-card-rm-item-<id>"
          >
            Remover
          </button>
          <label htmlFor="quantity">
            <input
              id="quantity"
              data-testid="customer_products__input-card-quantity-<id>"
              placeholder="0"
            />
          </label>
          <button
            type="button"
            data-testid="customer_products__button-card-add-item-<id>"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
