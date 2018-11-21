module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users', {
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
      password_hash: {
        type: DataTypes.STRING,
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
  });

  Users.beforeCreate((user) =>
      new sequelize.Promise((resolve) => {
          bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
              resolve(hashedPassword);
          });
      }).then((hashedPw) => {
          user.password_hash = hashedPw;
      })
  );
  
    return Users;
};




