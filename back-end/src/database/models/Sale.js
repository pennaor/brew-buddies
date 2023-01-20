'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
    },
    deliveryAddress: {
      type: DataTypes.STRING
    },
    deliveryNumber: {
      type: DataTypes.STRING
    },
    saleDate: {
      type: DataTypes.DATE
    },
    status: DataTypes.STRING
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'costumer',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'seller_id',
      as: 'seller',
    });
  }

  return Sale;
};
