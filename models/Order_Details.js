const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {}
  
  Order_Details.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      product_qty: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
     
    },
  
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      underscored: true,
      modelName: "Order_Details",
    }
  );

  Order_Details.associate = function(models) {
    Order_Details.hasOne(models.Product);

    Order_Details.belongsTo(models.Order);

  }

  return Order_Details
};


