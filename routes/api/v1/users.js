var express = require('express');
var router = express.Router();
var User = require('./../../../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypto = require('crypto');

/* POST user registration. */
router.post('/', function(req, res, next) {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, saltRounds),
    apiKey: crypto.randomBytes(32).toString('hex')
  })
  .then(user => {
    res.setHeader("Content-Type", "application/json");
    res.status(201).send(JSON.stringify({api_key: user.apiKey}));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error });
  });
});

module.exports = router;
