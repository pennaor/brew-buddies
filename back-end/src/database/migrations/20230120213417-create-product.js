'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      urlImage: {
        field: 'url_image',
        type: Sequelize.STRING,
        allowNull: false,
      },
    }, { timeStamps: false });
  },
  
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  }
};