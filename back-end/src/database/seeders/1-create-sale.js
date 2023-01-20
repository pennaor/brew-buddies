module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [ 
        {
          userId: 3,
          sellerId: 2,
          totalPrice: 10,
          deliveryAddress: 'Rua dos bobos',
          deliveryNumber: 369,
          saleDate: '1994-06-21',
          status: 'Entregue'
        }
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
