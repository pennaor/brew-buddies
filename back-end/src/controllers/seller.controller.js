const sellerService = require('../services/seller.service');

const getSellers = async (_req, res, next) => {
  try {
    const sellers = await sellerService.getAllSellers();
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const getSellerById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sellers = await sellerService.getSellerById(id);
    return res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const getSalesBySellerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await sellerService.getSalesBySellerId(id);
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSellers, getSellerById, getSalesBySellerId };