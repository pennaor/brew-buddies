const newSalePayload = {
  sellerId: 2,
  totalPrice: 300.19,
  deliveryAddress: 'rua dos bobos',
  deliveryNumber: 'numero 1',
};

const invalidNewSalePayload = {
  sellerId: 2,
  totalPrice: 'invalidPrice',
  deliveryAddress: 'rua dos bobos',
  deliveryNumber: 'numero 1',
};

const newSaleId = { id: 7 };

const saleSellerProducts = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '10.00',
  deliveryAddress: 'Rua dos bobos',
  deliveryNumber: '369',
  status: 'Entregue',
  saleDate: '1994-06-21T00:00:00.000Z',
  seller: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      SaleProduct: { quantity: 10 },
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      SaleProduct: { quantity: 20 },
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      SaleProduct: { quantity: 30 },
    },
  ],
};

const saleSellerProductsInstance = {
  toJSON: () => saleSellerProducts
};

const normalizedSaleSellerProducts = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '10.00',
  deliveryAddress: 'Rua dos bobos',
  deliveryNumber: '369',
  status: 'Entregue',
  saleDate: '1994-06-21T00:00:00.000Z',
  sellerName: 'Fulana Pereira',
  products: [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: '2.20',
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
      quantity: 10,
    },
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      quantity: 20,
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      quantity: 30,
    },
  ],
};

const userId = 3;

module.exports = {
  newSaleId,
  newSalePayload,
  invalidNewSalePayload,
  saleSellerProducts,
  normalizedSaleSellerProducts,
  userId,
  saleSellerProductsInstance,
};
