module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      field: 'sale_id',
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SaleProduct.associate = ({ Sale, Product }) => {
    SaleProduct.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' });

    Sale.belongsToMany(Product, {
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SaleProduct,
      as: 'products',
    });

    SaleProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

    Product.belongsToMany(Sale, {
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SaleProduct,
      as: 'sales',
    });
  }

  return SaleProduct;
};
