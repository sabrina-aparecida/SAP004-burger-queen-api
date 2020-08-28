'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(1,2)
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};