var express = require('express');
var router = express.Router();
var User = require('./../../../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypto = require('crypto');

/* POST user login. */
router.post('/', function(req, res, next) {
  if (req.body.email && req.body.password) {
      User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then(user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.setHeader("Content-Type", "application/json");
          res.status(200).send(JSON.stringify({api_key: user.apiKey}));
        } else {
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(JSON.stringify({error: "Incorrect password"}));
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send({ error });
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Missing an entry"}));
  }
});

module.exports = router;
