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
debugger;
        expect(Object.keys(body)).toEql(["data"]),
        expect(Object.keys(body["data"])).toEql(["location", "currently", "hourly", "daily"]),
        expect(body["data"]["location"]).toEql("denver,co"),
        expect(body["data"]["location"]).toEql("denver,co"),

        expect(body["data"]["hourly"].length).toEql(8),
        expect(body["data"]["daily"].length).toEql(7),

    });
  });
});
