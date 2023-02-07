const customerService = require('../services/customer.service');

const getSalesByCustomerId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sales = await customerService.getSalesByCustomerId(id);
    return res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSalesByCustomerId };
