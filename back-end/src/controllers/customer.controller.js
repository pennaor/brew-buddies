const customerService = require('../services/customer.service');

const getSalesByCustomerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await customerService.getSalesByCustomerId(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSalesByCustomerId };
