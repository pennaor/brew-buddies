const customer = [
    {
      id: 2,
      name: "Enzo Pereira",
      email: "enzo@deliveryapp.com",
      role: "customer",
    },
  
    {
      id: 3,
      name: "Valentina Da silva",
      email: "valentina@deliveryapp.com",
      role: "customer",
    },
  ];
  
  const customerSale = [
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
  
  module.exports = { customer, customerSale };
  