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
      type: DataTypes.DECIMAL(9,2),
    },
    deliveryAddress: {
      type: DataTypes.STRING
    },
    deliveryNumber: {
      type: DataTypes.STRING
    },
    status: DataTypes.STRING
  },
  {
    timestamps: true,
    updatedAt: false,
    createdAt: "saleDate",
    tableName: 'sales',
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'costumer',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
    Sale.hasMany(models.SaleProduct, {
      foreignKey: 'saleId',
      as: 'salesProducts',
    });
  }

  return Sale;
};
