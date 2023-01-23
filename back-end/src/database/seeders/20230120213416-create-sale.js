module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [ 
        {
          id: 1,
          user_Id: 3,
          seller_Id: 2,
          total_price: 10.00,
          delivery_address: 'Rua dos bobos',
          delivery_number: '369',
          sale_date: '1994-06-21',
          status: 'Entregue'
        }
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
