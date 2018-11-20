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




