module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Orders', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      status: DataTypes.STRING,
      invoiceNumber: {
          type: DataTypes.STRING,
          allowNull: false
      },
      sharesPurchased: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      tickerPurchased: {
          type: DataTypes.STRING,
          allowNull: false
      },
      tickerPrice:  {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      orderType: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
      },
    });
  
    return Order;
};