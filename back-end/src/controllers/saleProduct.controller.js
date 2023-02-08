const useTransaction = require('../middlewares/useTransaction');
const saleService = require('../services/sale.service');
const saleProductService = require('../services/saleProduct.service');

const create = async (req, res, next) => {
  const { products, ...salePayload } = req.body;

  try {
    const saleId = await useTransaction(async (transaction) => {
      const sale = await saleService.create(req.user.id, salePayload, { transaction, raw: true });
      await saleProductService.create(sale.id, products, { transaction });
      return sale.id;
    });
    return res.status(201).json({ saleId });
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
