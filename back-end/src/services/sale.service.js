const { Sale } = require('../database/models');
const HttpException = require('../exceptions/HttpException');
const { saleSchema, updateSaleStatusSchema } = require('../joi/schemas');

const create = async (userId, payload, createOptions) => {
  const { error } = saleSchema.validate(payload);
  if (error) {
    throw new HttpException(400, error.message);
  }
  const {
    sellerId, totalPrice, deliveryAddress,
    deliveryNumber,
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
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new HttpException(404, 'Sale not found');
  }
  return sale;
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
