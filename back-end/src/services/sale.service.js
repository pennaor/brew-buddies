const { Sale } = require('../database/models');
const HttpException = require('../exceptions/HttpException');
const { saleSchema } = require('../joi/schemas');
const userService = require('./user.service');

const create = async (userId, payload, createOptions) => {
  const { error } = saleSchema.validate(payload);
  if (error) {
    throw new HttpException(400, error.message);
  }
  const {
    sellerName, totalPrice, deliveryAddress,
    deliveryNumber,
  } = payload;
  const seller = await userService.getByName(sellerName);
  const result = await Sale.create({
    userId,
    sellerId: seller.id,
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

module.exports = {
  create,
  getSaleById,
};
