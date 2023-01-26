const { User } = require('../database/models');

const getAllSellers = async () => User.findAll({ 
  where: { role: 'seller' }, attributes: { exclude: ['password'] } });

const getSellerById = async (sellerId) => {
  const seller = await User.findOne({
    where: { id: sellerId, role: 'seller' }, attributes: { exclude: ['password'] } });

  if (!seller) {
    const error = new Error('Seller not found');
    error.name = 'NOT_FOUND';
    throw error;
  }
  return seller;
};

module.exports = { getAllSellers, getSellerById }; 