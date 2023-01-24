module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products',
      [ 
        {
          name: 'Skol Lata 250ml',
          price: 2.20,
          url_image: 'https://m.media-amazon.com/images/I/51G13N7cczL._AC_SL1000_.jpg',
        },
        {
          name: 'Heineken 600ml',
          price: 7.50,
          url_image: 'https://d2r9epyceweg5n.cloudfront.net/stores/001/212/823/products/cerveja-heineken-600ml1-fe6d3ebca2221e4e0215913002426019-640-0.jpg',
        },
        {
          name: 'Antarctica Pilsen 300ml',
          price: 2.49,
          url_image: 'https://m.media-amazon.com/images/I/61K2aJcVgoL._AC_SX679_.jpg',
        },
      ], { timestamps: false });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
