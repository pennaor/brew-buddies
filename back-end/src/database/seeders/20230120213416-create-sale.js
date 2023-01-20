module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales',
      [ 
        {
          id: 1,
          user_Id: 3,
          seller_Id: 2,
          total_Price: 10.00,
          delivery_Address: 'Rua dos bobos',
          delivery_Number: '369',
          sale_Date: '1994-06-21',
          status: 'Entregue'
        }
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};
