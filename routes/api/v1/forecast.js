var express = require('express');
var router = express.Router();
var User = require('./../../../models').User;
const fetch = require('node-fetch');
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypto = require('crypto');

/* GET forecast for city. */
router.get('/', async (req, res) => {
  if (req.body.api_key) {
      await User.findOne({
        where: {
          apiKey: req.body.api_key
        }
      })
      .then(user => {
        if (user) {
          fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GEOCODE_GOOGLE_API_KEY}`)
          .then(response => response.text())
          .then(body => JSON.parse(body)["results"][0]["geometry"]["location"])
          .then(coordinates => {
            fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${coordinates["lat"]},${coordinates["lng"]}`)
            .then(response => response.text())
            .then(body => {
              res.setHeader("Content-Type", "application/json");
              res.status(200).send(JSON.stringify({data: body}));
            })
          })
          .catch(error => {
            res.setHeader("Content-Type", "application/json");
            res.status(401).send({ error });
          });
        }
      })
      .catch(error => {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify({error: "Incorrect API key"}));
      });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({error: "Missing API key"}));
  }
});

const getResults = async (location) => {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.GEOCODE_GOOGLE_API_KEY}`)
  .then(response => {
    return response.json();
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send({ error });
  });
}

module.exports = router;
