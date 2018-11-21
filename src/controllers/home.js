const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize');
const passport = require('../middlewares/auth');

const router = express.Router();

//main route to return our dummy data in json
router.get("/api/user/:id", function(req, res){
    const userId = req.params.id;
    models.Users.findAll({where: { id: userId }, raw: true})
      .then(data => {
        res.json(data[0]);
    }).catch((err) => {
        res.send(err);
      })
  });

router.post("/api/signup", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const age = req.body.age;
    const country = req.body.country;
    const email = req.body.email;

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  });


router.get('/logout', (req, res) => {
  req.logout(); // passport created a nice logout function for us!
  res.sendStatus(200);
});


router.put("/api/user/:id/portfolio-value", function(req, res){
    const newPortfolioValue = req.body.portfolioValue;
    const user_id = req.body.id;
  
    models.Users.update({portfolioValue: newPortfolioValue}, 
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
  
    models.Users.update({portfolio: newPortfolio, cash: newCashValue}, 
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