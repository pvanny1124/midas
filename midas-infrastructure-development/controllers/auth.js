const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const User = require("../models/users")(sequelize, Sequelize);
const passport = require('../middlewares/auth');

const router = express.Router();

router.get('/auth/error', (req, res) => {
  res.sendStatus(401).json({message: "something went wrong"});
})


router.post('/signup', (req, res) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    age: req.body.age,
    country: req.body.country,
    portfolio: req.body.portfolio,
    portfolioValue: req.body.portfolioValue,
    cash: req.body.cash,
    password_hash: req.body.password,
  }).then((user) => {
      console.log(user.dataValues);

      if(user){
          res.status(200).json({userCreated: true, user: user.dataValues});
      }
      
  }).catch((error) => {
      console.log(error);
    //TODO: error handle different causes for validation errors..

    //Check if first name, last name, username, or email fields are empty
    if(error.name == 'SequelizeValidationError'){
        console.log(error.errors);

        //Cache errors with the fields that field, type of error, and validator
        let errorPaths = []
        for(var error of error.errors){
            errorPaths.push({
              type: error.validatorName,
              path: error.path,
              validator: error.validatorName
            });
        }

        //send error name and the different input fields that can't be empty back to client
        res.json({
           error: errorPaths,
        })
    }

 
    //Check for duplicate emails and usernames
    if(error.name == 'SequelizeUniqueConstraintError'){
        let errorPaths = []
        for(var error of error[0]){
            errorPaths.push(error.path);
        }

        res.json({
          error: error.name,
          type: "UniqueConstraintError",
          paths: errorPaths
        })
    }
  });
});


router.post('/login',
  passport.authenticate('local', { failureRedirect: '/auth/error' }),
  (req, res) => {
    return res.status(200).json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    });
  });


router.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

router.get("/api/auth", passport.checkAuthentication, (req, res) => {
      console.log(req.user)
      res.json(req.user)
})


router.get('/profile',
  passport.redirectIfNotLoggedIn('/login'),
  (req, res) => {
    res.json({ msg: "This is the profile page for: " + req.user.email });
});


module.exports = router;