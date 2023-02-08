const validRequest = {
  user: {
    id: 3,
  },
  body: {
    sellerId: 2,
    totalPrice: 300.19,
    deliveryAddress: 'rua dos bobos',
    deliveryNumber: 'numero 1',
    products: [
      { productId: 1, quantity: 5 },
      { productId: 2, quantity: 8 },
    ],
  },
};

module.exports = { validRequest };
