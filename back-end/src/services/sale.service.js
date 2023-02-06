const { Sale, User, Product } = require('../database/models');
const HttpException = require('../exceptions/HttpException');
const { saleSchema, updateSaleStatusSchema } = require('../joi/schemas');

const create = async (userId, payload, createOptions) => {
  const { error } = saleSchema.validate(payload);
  if (error) {
    throw new HttpException(400, error.message);
  }

  const {
    sellerId, totalPrice,
    deliveryAddress, deliveryNumber,
  } = payload;

  const result = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  }, createOptions);

  return result;
};

const getSaleById = async (id) => {
  const result = await Sale.findOne({
    where: { id },
    include: [
      { model: User, as: 'seller', attributes: { exclude: ['password'] } },
      { model: Product, as: 'products', through: { attributes: ['quantity'] } },
    ],
  });
  
  if (!result) throw new HttpException(404, 'Sale not found');

  const { seller, products, ...sale } = result.toJSON();

  const normalizedProducts = products.map((product) => {
    const { SaleProduct: { quantity }, ...rest } = product;
    return { ...rest, quantity };
  });

  return {
    ...sale,
    sellerName: seller.name,
    products: normalizedProducts,
  };
};

const updateSaleStatus = async (saleId, status) => {
  const { error } = updateSaleStatusSchema.validate({ saleId, status });
  if (error) {
    throw new HttpException(400, error.message);
  }
  await Sale.update(
    {
      status,
    },
    {
      where: {
        id: saleId,
      },
    },
  );
};

module.exports = {
  create,
  getSaleById,
  updateSaleStatus,
};
