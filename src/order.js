// module.exports = (sequelize, DataTypes) => {
//     const Order = sequelize.define('Orders', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//       },
//       status: DataTypes.STRING,
//       invoiceNumber: DataTypes.STRING,
//       sharesPurchased: DataTypes.INTEGER,
//       tickerPurchased: DataTypes.STRING,
//       tickerPrice: DataTypes.INTEGER,
//       orderType: DataTypes.STRING,
//       createdAt: {
//         allowNull: false,
//         type: DataTypes.DATE
//       },
//       updatedAt: {
//             allowNull: false,
//             type: DataTypes.DATE
//       },
//     });
  
//     Order.associate = models => {
//       Order.belongsTo(models.User, {foreignKey: "user_id", targetKey: "id"});
//     };
  
//     return Order;
//   };