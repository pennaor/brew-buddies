'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      field: 'seller_id',
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      field: 'total_price',
      type: DataTypes.NUMBER
    },
    deliveryAddress: {
      field: 'delivery_address',
      type: DataTypes.STRING
    },
    deliveryNumber: {
      field: 'delivery_number',
      type: DataTypes.STRING
    },
    saleDate: {
      field: 'sale_date',
      type: DataTypes.DATETIME
    },
    status: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.hasOne(models.User, {
      foreignKey: 'user_id',
      as: 'costumer',
    });
    Sale.hasOne(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  }

  return Sale;
};
