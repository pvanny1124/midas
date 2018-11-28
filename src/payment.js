// module.exports = (sequelize, DataTypes) => {
//     const Payment = sequelize.define('Payment', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//       },
//       status: DataTypes.STRING,
//       amount: DataTypes.DECIMAL,
//       type: DataTypes.STRING, //cash or virtual money? s
//       method: DataTypes.STRING //paid with cc, cash, bank account, etc..
//     });
  
//     Payment.associate = models => {
//       Payment.hasOne(models.Order);
//     };
  
//     return Payment;
// }