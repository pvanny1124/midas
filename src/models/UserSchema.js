module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
  
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cash: {
        type: DataTypes.FLOAT
      },
      portfolioValue: {
        type: DataTypes.FLOAT
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      portfolio: {
        type: DataTypes.JSONB
      }
  })
    return Users;
  };
//schema


// Users.sync({force: true}).then(() => {
//     // Table created
//     return Users.create({
//       firstName: 'John',
//       lastName: 'Hancock',
//       age: 23,
//       country: 'USA',
//       cash: 10000,
//       email: 'pvanny1124@gmail.com',
//       username: 'patrickv',
//       password: 'swaggy1124'
//     }).then(user => {
//       console.log(user);
//     });
//   });

// Users.update({
//         portfolio: {
//               aapl: {
//                 shares: 5
//               },
//               amd: {
//                 shares: 4
//               }
//             },
//           cash: 100000
//          },
//          {
//            where: {id: 1},
//            returning: true,
//            raw: true
//          }
//       ).then(user => {
//         console.log(user[1][0]);
//       })

