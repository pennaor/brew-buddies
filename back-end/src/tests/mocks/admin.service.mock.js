const createdUser = {
  id: 7,
  name: "Carnaval Bebidas",
  email: "canavalbebs@email.com",
  password: "25f9e794323b453885f5181f1b624d0b",
  role: "seller",
};

const newUser = {
  name: "Carnaval Bebidas",
  email: "canavalbebs@email.com",
  password: "123456789",
  role: "seller",
};

const users = [
  {
    id: 1,
    name: "Delivery App Admin",
    email: "adm@deliveryapp.com",
    role: "administrator",
  },
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },
  {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
  },
];

module.exports = { createdUser, newUser, users };
