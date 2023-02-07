const { SaleProduct } = require('../database/models');
const HttpException = require('../exceptions/HttpException');
const { productArraySchema } = require('../joi/schemas');

const create = async (saleId, products, createOptions) => {
  const { error } = productArraySchema.validate(products);
  if (error) {
    throw new HttpException(400, error.message);
  }

  return Promise.all(
    products
      .map(({ productId, quantity }) => SaleProduct
        .create({ saleId, productId, quantity }, createOptions)),
  );
};

module.exports = { create };
