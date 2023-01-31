const saleId = 7;

const productsQuantities = [
  { productId: 1, quantity: 4 },
  { productId: 2, quantity: 5 },
  { productId: 3, quantity: 6 },
];

const saleIdProductsQuantities = [
  { saleId, ...productsQuantities[0] },
  { saleId, ...productsQuantities[1] },
  { saleId, ...productsQuantities[2] },
];

const invalidProductsQuantities = [
  { productId: 2, quantity: 5 },
  { prodxcty: 1, qty: 4 },
  { productId: 3, quantity: 6 },
];

module.exports = {
  saleId,
  productsQuantities,
  saleIdProductsQuantities,
  invalidProductsQuantities,
};
