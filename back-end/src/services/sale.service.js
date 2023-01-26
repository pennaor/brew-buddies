const { Sale } = require('../database/models');
const { saleSchema } = require('../joi/schemas');
const userService = require('./user.service');

const create = async (userId, payload, createOptions) => {
  const { error } = saleSchema.validate(payload);
  if (error) { error.name = 'BAD_REQUEST'; throw error; }
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
    const error = new Error('Sale not found');
    error.name = 'NOT_FOUND';
    throw error;
  }
  return sale;
};

const getSalesByUserId = async (userId) => {
  const sales = await Sale.findAll({ where: { userId }, raw: true });
  return sales;
};

module.exports = {
  create,
  getSaleById,
  getSalesByUserId,
};
