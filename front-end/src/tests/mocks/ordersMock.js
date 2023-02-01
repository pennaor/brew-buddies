export const orderByIdMock = {
  deliveryAddress: 'Rua das maças, centro',
  deliveryNumber: '580',
  id: 3,
  products: [{
    id: 3,
    name: 'Stella Artois 275ml',
    price: '3.49',
    quantity: 1,
    urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
  },
  {
    id: 1,
    name: 'Skol Beats Senses 269ml',
    price: '3.57',
    quantity: 5,
    urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
  },
  {
    id: 5,
    name: 'Becks 600ml',
    price: '8.89',
    quantity: 3,
    urlImage: 'http://localhost:3001/images/becks_600ml.jpg',
  }],
  saleDate: '2023-01-31T21:40:27.000Z',
  sellerId: 2,
  sellerName: 'Fulana Pereira',
  status: 'Pendente',
  totalPrice: '48.01',
  userId: 3,
};

export const sellerOrdersMock = [
  {
    deliveryAddress: 'Rua oliveira',
    deliveryNumber: '456',
    id: 1,
    saleDate: '2023-01-31T22:16:46.000Z',
    sellerId: 2,
    status: 'Pendente',
    totalPrice: '12.19',
    userId: 3,
  },
];
