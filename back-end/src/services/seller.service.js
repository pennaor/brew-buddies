const { User, Sale } = require('../database/models');
const HttpException = require('../exceptions/HttpException');

const getAllSellers = async () => User.findAll({ 
  where: { role: 'seller' },
  attributes: { exclude: ['password'] },
});

const getSellerById = async (sellerId) => {
  const seller = await User.findOne({
    where: { id: sellerId, role: 'seller' },
    attributes: { exclude: ['password'] },
  });

  if (!seller) {
    throw new HttpException(404, 'Seller not found');
  }

  return seller;
};

const getSalesBySellerId = async (sellerId) => Sale.findAll({ where: { sellerId } });

module.exports = {
  getAllSellers,
  getSellerById,
  getSalesBySellerId,
};
