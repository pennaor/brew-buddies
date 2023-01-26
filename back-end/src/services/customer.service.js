const { Sale } = require('../database/models');

const getSalesByCustomerId = async (userId) => {
  const sales = await Sale.findAll({ where: { userId }, raw: true });
  return sales;
};

module.exports = {
  getSalesByCustomerId,
};
