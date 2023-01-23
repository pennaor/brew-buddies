'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
    },
    urlImage: {
      type: DataTypes.STRING,
      field: 'url_image',
    }
  },
  {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });

  return Product;
};
