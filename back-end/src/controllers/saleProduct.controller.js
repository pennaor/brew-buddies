const useTransaction = require('../middlewares/useTransaction');
const saleService = require('../services/sale.service');
const saleProductService = require('../services/saleProduct.service');

const create = async (req, res, next) => {
  const { products, ...salePayload } = req.body;
  try {
    await useTransaction(async (transaction) => {
      const sale = await saleService.create(req.user.id, salePayload, { transaction });
      await saleProductService.create(sale.id, products, { transaction });
    });
    return res.status(201).end();
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
