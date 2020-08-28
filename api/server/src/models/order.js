'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    client: DataTypes.STRING,
    table: DataTypes.DECIMAL(1,2),
    itens: DataTypes.VIRTUAL
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};