'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sales', {
      id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sellerId: {
        field: 'seller_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalPrice: {
        field: 'total_price',
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      deliveryAddress: {
        field: 'delivery_address',
        type: DataTypes.STRING,
        allowNull: false,
      },
      deliveryNumber: {
        field: 'delivery_number',
        type: DataTypes.STRING,
        allowNull: false
      },
      saleDate: {
        field: 'sale_date',
        type: DataTypes.DATETIME,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  }
};