var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

class CoordinatesService {
  constructor(location) {
    this.location = location;
  }

  let getResults = async () => {

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.GEOCODE_GOOGLE_API_KEY}`)
    .then(response => {
      return response.json();

    })
    .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(401).send({ error });
    });
  }
  // .then(body => {

    // results: console.log(body)
    // })
    // .then(body => console.log(body))
      // debugger;


    // result: res.json()["results"][0]);
        // .then(json => console.log(json));
    // let citystate = `${results[:address_components][0][:short_name]}, ${results[:address_components][2][:short_name]}`;

    // return {
    //   coordinates: results[:geometry][:location],
    //   citystate: citystate,
    //   country: country
    // }





}

module.exports = CoordinatesService;



  // def get_results(address)
  //   data = { address: address }
  //   results = get_json("geocode/json", data)[:results][0]
  //
  //   citystate = "#{results[:address_components][0][:short_name]}, #{results[:address_components][2][:short_name]}"
  //   country = results[:address_components][3][:long_name]
  //
  //   {
  //     coordinates: results[:geometry][:location],
  //     citystate: citystate,
  //     country: country
  //   }
  // end

  // def get_json(path, data)
  //   response = conn.get(path, data)
  //   JSON.parse(response.body, symbolize_names: true)
  // end
  //
  // def conn
  //   Faraday.new('https://maps.googleapis.com/maps/api/') do |f|
  //     f.params['key'] = ENV['GEOCODE_GOOGLE_API_KEY']
  //     f.adapter Faraday.default_adapter
  //   end
  // end
