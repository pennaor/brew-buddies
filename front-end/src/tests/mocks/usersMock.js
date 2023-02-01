export const inputRegisterMock = {
  name: 'Marquinhos Gameplay',
  email: 'Mgameplay@bol.com',
  password: 'Eujogomuito',
};

export const outputRegisterMock = {
  id: 4,
  name: 'Marquinhos Gameplay',
  email: 'Mgameplay@bol.com',
  token: 'customer token',
  role: 'customer',
};

export const inputCustomerMock = {
  email: 'zebirita@email.com',
  password: '$#zebirita#$',
};

export const outputCustomerMock = {
  id: 2,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  token: 'customer token',
  role: 'customer',
};

export const inputSellerMock = {
  email: 'fulana@deliveryapp.com',
  password: 'fulana@123',
};

export const outputSellerMock = {
  id: 3,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  token: 'seller token',
  role: 'seller',
};

export const outputAdminMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
};
export const inputAdminMock = {
  email: 'adm@deliveryapp.com',
  password: '--adm2@21!!--',
};

export const allUsers = [
  {
    email: 'zebiritajr@email.com',
    id: 4,
    name: 'Zé Birita Jr',
    role: 'customer',
  },
  {
    email: 'aluisio@gmail.com',
    id: 5,
    name: 'Aluisio Mercadante',
    role: 'seller',
  },
];

export const orders = [
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
