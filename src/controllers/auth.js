const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize')
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
    password_hash: req.body.password,
  }).then((user) => {
      console.log(user);
      res.status(200).json({userCreated: true});
  }).catch((err) => {
    console.log(err);
    res.status(401).json({userCreated: false});
  });
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
  req.logout();
  res.sendStatus(200);
});


router.get('/profile',
  passport.redirectIfNotLoggedIn('/login'),
  (req, res) => {
    res.json({ msg: "This is the profile page for: " + req.user.email });
});


module.exports = router;