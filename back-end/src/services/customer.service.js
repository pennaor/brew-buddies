const { Sale } = require('../database/models');

const getSalesByCustomerId = async (userId) => Sale.findAll({ where: { userId } });

module.exports = {
  getSalesByCustomerId,
};
