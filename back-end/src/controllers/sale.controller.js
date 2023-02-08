const saleService = require('../services/sale.service');

const getSaleById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await saleService.getSaleById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  const { id: saleId } = req.params;
  const { status } = req.body;

  try {
    await saleService.updateSaleStatus(saleId, status);
    return res.status(202).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { getSaleById, updateSaleStatus };
