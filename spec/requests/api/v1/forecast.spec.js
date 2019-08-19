var shell = require('shelljs');
var request = require("supertest");
var app = require('./../../../../app');
var User = require('./../../../../models').User;

const bcrypt = require('bcrypt');

describe("Geocoding and forecast api", () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });
  afterAll(() => {
    shell.exec('npx sequelize db:drop')
  });

  test("should return current weather for a city/state", () => {
    return User.create({
        email: "my_email@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "12345"
    })
    .then(user => {
      return request(app).get('/api/v1/forecast?location=denver,co').send({api_key: user.apiKey})
    })
    .then(response => {
      expect(response.status).toBe(200);

      const body = response.body
      expect(Object.keys(body)).toEqual(["data"]),
      expect(Object.keys(body["data"])).toEqual(["location", "currently", "hourly", "daily"]),
      expect(body["data"]["location"]).toEqual("denver,co"),

      expect(Object.keys(body["data"]["currently"])).toEqual([
        "time",
        "summary",
        "icon",
        "nearestStormDistance",
        "nearestStormBearing",
        "precipIntensity",
        "precipProbability",
        "temperature",
        "apparentTemperature",
        "dewPoint",
        "humidity",
        "pressure",
        "windSpeed",
        "windGust",
        "windBearing",
        "cloudCover",
        "uvIndex",
        "visibility",
        "ozone"
      ]),

      expect(body["data"]["hourly"].length).toEqual(8),
      expect(Object.keys(body["data"]["hourly"][0])).toEqual([
        "time",
        "summary",
        "icon",
        "precipIntensity",
        "precipProbability",
        "temperature",
        "apparentTemperature",
        "dewPoint",
        "humidity",
        "pressure",
        "windSpeed",
        "windGust",
        "windBearing",
        "cloudCover",
        "uvIndex",
        "visibility",
        "ozone"
      ]),


      expect(body["data"]["daily"].length).toEqual(7),
      expect(Object.keys(body["data"]["daily"][0])).toEqual([
        "time",
        "summary",
        "icon",
        "sunriseTime",
        "sunsetTime",
        "moonPhase",
        "precipIntensity",
        "precipIntensityMax",
        "precipIntensityMaxTime",
        "precipProbability",
        "temperatureHigh",
        "temperatureHighTime",
        "temperatureLow",
        "temperatureLowTime",
        "apparentTemperatureHigh",
        "apparentTemperatureHighTime",
        "apparentTemperatureLow",
        "apparentTemperatureLowTime",
        "dewPoint",
        "humidity",
        "pressure",
        "windSpeed",
        "windGust",
        "windGustTime",
        "windBearing",
        "cloudCover",
        "uvIndex",
        "uvIndexTime",
        "visibility",
        "ozone",
        "temperatureMin",
        "temperatureMinTime",
        "temperatureMax",
        "temperatureMaxTime",
        "apparentTemperatureMin",
        "apparentTemperatureMinTime",
        "apparentTemperatureMax",
        "apparentTemperatureMaxTime"
      ])
    });
  });
});
