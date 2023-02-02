const sellerFulanaEmail = 'fulana@deliveryapp.com';
const adminEmail = 'adm@deliveryapp.com';
const sellerFulanaName = 'Fulana Pereira';

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
  name: sellerFulanaName,
  email: sellerFulanaEmail,
  token: 'seller token',
  role: 'seller',
};

export const outputAdminMock = {
  id: 1,
  name: 'Delivery App Admin',
  email: adminEmail,
  role: 'administrator',
};

export const inputAdminMock = {
  email: adminEmail,
  password: '--adm2@21!!--',
};

export const allUsers = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: adminEmail,
    role: 'administrator',
  },
  {
    id: 2,
    name: sellerFulanaName,
    email: sellerFulanaEmail,
    role: 'seller',
  },
  {
    email: 'zebiritajr@email.com',
    id: 3,
    name: 'Zé Birita Jr',
    role: 'customer',
  },
  {
    id: 5,
    name: 'Boss da empresa',
    email: 'boss@boss.com',
    role: 'administrator',
  },
];

export const outputAllSellersMock = [
  {
    id: 2,
    name: sellerFulanaName,
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
