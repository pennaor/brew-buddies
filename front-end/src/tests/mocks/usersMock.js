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

export const outputAllSellersMock = [
  {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    role: 'seller',
  },
  {
    id: 6,
    name: 'Fulano Almeida',
    email: 'almeida@deliveryapp.com',
    role: 'seller',
  },
];
