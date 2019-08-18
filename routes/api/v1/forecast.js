var express = require('express');
var router = express.Router();
var User = require('./../../../models').User;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const crypto = require('crypto');

/* GET forecast for city. */
router.get('/', function(req, res, next) {
  if (req.body.api_key) {
      User.findOne({
        where: {
          apiKey: req.body.api_key
        }
      })
      .then(user => {
        if (user) {
          res.setHeader("Content-Type", "application/json");
          let coordinates = new GeocodingService(req.query.location);
          return coordinates.get_results()
          res.status(200).send(JSON.stringify({api_key: user.apiKey}));
          .then(response => {
            let location = response.results[0].get_location;
            let forecast = new ForecastService(location["lat"], location["long"]);
            return forecast.get_results()
            .then(forecast => {
              res.status(200).send(JSON.stringify({
                location: "find in object",
                currently: "find in object",
                hourly: "find in object",
                daily: "find in object"
              })
            )})
          })
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

module.exports = router;
