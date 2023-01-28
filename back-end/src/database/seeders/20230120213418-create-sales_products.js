module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('sales_products',
      [ 
        {
          sale_id: 1,
          product_id: 1,
          quantity: 10,
        },
        {
          sale_id: 1,
          product_id: 2,
          quantity: 20,
        },
        {
          sale_id: 1,
          product_id: 3,
          quantity: 30,
        },
        {
          sale_id: 5,
          product_id: 1,
          quantity: 10,
        },
        {
          sale_id: 6,
          product_id: 2,
          quantity: 20,
        },
        {
          sale_id: 6,
          product_id: 3,
          quantity: 30,
        },
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales_products', null, {});
  },
};
