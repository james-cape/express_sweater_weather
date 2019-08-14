var express = require('express');
var router = express.Router();
var User = require('./../../../../app').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypto = require('crypto');

// var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

/* POST user registration. */
router.post('/', function(req, res, next) {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    apiKey: crypto.randomBytes(32).toString('hex');
  })
  // use .send to pass in params in Test


  // res.render('index', { title: 'Express' });
});
