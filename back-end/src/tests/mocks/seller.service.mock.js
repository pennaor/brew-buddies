const seller = [
  {
    id: 2,
    name: "Fulana Pereira",
    email: "fulana@deliveryapp.com",
    role: "seller",
  },

  {
    id: 3,
    name: "Sammie Safari",
    email: "sammie@deliveryapp.com",
    role: "seller",
  },
];

const sellerSale = [
    {
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "10",
      "deliveryAddress": "Rua dos bobos",
      "deliveryNumber": "369",
      "status": "Entregue",
      "saleDate": "1994-06-21T00:00:00.000Z"
    },
    {
      "id": 2,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "30",
      "deliveryAddress": "Rua das bobos",
      "deliveryNumber": "369",
      "status": "Em Trânsito",
      "saleDate": "2023-01-26T00:00:00.000Z"
    },
];

module.exports = { seller, sellerSale };
