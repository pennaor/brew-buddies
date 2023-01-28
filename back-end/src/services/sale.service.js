const { Sale, User, Product, SaleProduct } = require('../database/models');
const HttpException = require('../exceptions/HttpException');
const { saleSchema, updateSaleStatusSchema } = require('../joi/schemas');

const create = async (userId, payload, createOptions) => {
  const { error } = saleSchema.validate(payload);
  if (error) {
    throw new HttpException(400, error.message);
  }
  const {
    sellerId, totalPrice, deliveryAddress,
    deliveryNumber,
  } = payload;
  const result = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: 'Pendente',
  }, createOptions);
  return result;
};

const getSaleById = async (saleId) => {
  const sale = await Sale.findByPk(saleId);
  if (!sale) throw new HttpException(404, 'Sale not found');
  const seller = await User.findOne({ where: { id: sale.sellerId } });
  if (!seller) throw new HttpException(404, 'Sale not found');

  const saleProducts = await SaleProduct.findAll({ where: { saleId: sale.id } }, { raw: true });
  const products = await Product.findAll({}, { raw: true });

  const filtredProducts = saleProducts.map((saleP) => {
    const { id, name, price } = products.find((product) => product.id === saleP.product_id);
    return { id, name, price, quantity: saleP.quantity };
  });

  return { ...sale.toJSON(), sellerName: seller.name, products: filtredProducts };
};

const updateSaleStatus = async (saleId, status) => {
  const { error } = updateSaleStatusSchema.validate({ saleId, status });
  if (error) {
    throw new HttpException(400, error.message);
  }
  await Sale.update(
    {
      status,
    },
    {
      where: {
        id: saleId,
      },
    },
  );
};

module.exports = {
  create,
  getSaleById,
  updateSaleStatus,
};
