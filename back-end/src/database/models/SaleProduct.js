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
    Sale.belongsToMany(Product, {
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: SaleProduct,
      as: 'products',
    });
    Product.belongsToMany(Sale, {
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: SaleProduct,
      as: 'sales',
    });
  }

  return Product;
};
