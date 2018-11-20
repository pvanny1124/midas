const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    database: process.env.DBNAME,
    username: process.env.USER,
    password: process.env.PASSWORD,
    dialect: 'postgres',
    port: 5432
  });
  
  var Users = require('../models/users')(sequelize, Sequelize);

const router = express.Router();

//main route to return our dummy data in json
router.get("/api/user/:id", function(req, res){
    const userId = req.params.id;
    Users.findAll({where: { id: userId }, raw: true})
      .then(data => {
        res.json(data[0]);
    }).catch((err) => {
        res.send(err);
      })
  });


router.put("/api/user/:id/portfolio-value", function(req, res){
    const newPortfolioValue = req.body.portfolioValue;
    const user_id = req.body.id;
  
    Users.update({portfolioValue: newPortfolioValue}, 
          { where: { id: user_id },
            returning: true,
            raw: true
          }).then(data => {
              res.json(data[1][0]);
          }).catch((error) => {
              console.log(error);
          });
  });
  

router.put("/api/user/:id", function(req, res){
    const userId = req.params.id;
    const newPortfolio = req.body.portfolio;
    const newCashValue = req.body.cash;
  
    Users.update({portfolio: newPortfolio, cash: newCashValue}, 
          { where: { id: userId },
            returning: true,
            raw: true
          }).then(data => {
              res.json(data[1][0]);
          }).catch((error) => {
              console.log(error);
          });
  });

module.exports = router;