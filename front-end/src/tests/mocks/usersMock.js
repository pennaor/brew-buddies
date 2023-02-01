const sellerFulanaEmail = 'fulana@deliveryapp.com';

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
  id: 3,
  name: 'Cliente Zé Birita',
  email: 'zebirita@email.com',
  token: 'customer token',
  role: 'customer',
};

export const inputSellerMock = {
  email: sellerFulanaEmail,
  password: 'fulana@123',
};

export const outputSellerMock = {
  id: 3,
  name: 'Fulana Pereira',
  email: sellerFulanaEmail,
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

export const outputAllSellersMock = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: sellerFulanaEmail,
    role: 'seller',
  },
  {
    id: 6,
    name: 'Fulano Almeida',
    email: 'almeida@deliveryapp.com',
    role: 'seller',
  },
];
