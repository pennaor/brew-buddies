const { SaleProduct } = require('../database/models');
const { productArraySchema } = require('../joi/schemas');

const create = async (saleId, products, createOptions) => {
  const { error } = productArraySchema.validate(products);
  if (error) { error.name = 'BAD_REQUEST'; throw error; }
  return Promise.all(
    products
      .map(({ productId, quantity }) => SaleProduct
        .create({ saleId, productId, quantity }, createOptions)),
  );
};

module.exports = { create };