module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products',
      [ 
        {
          name: 'Coca-cola',
          price: 10.00,
          url_image: '',
        },
        {
          name: 'Fanta',
          price: 20.00,
          url_image: '',
        },
        {
          name: 'Guarana',
          price: 30.00,
          url_image: '',
        },
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
