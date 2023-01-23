'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sellerId: {
        field: 'seller_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalPrice: {
        field: 'total_price',
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: Sequelize.STRING,
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: Sequelize.STRING,
      },
      saleDate: {
        field: 'sale_date',
        type: Sequelize.DATE,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};