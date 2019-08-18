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

  xtest("should return current weather for a city/state", () => {
    return User.create({
        email: "my_email@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "12345"
    })
    .then (user => {
      return request(app).get('/api/v1/forecast?location=denver,co').send({api_key: user.apiKey})
    })
    .then(response => {
        expect(response.status).toBe(200);
        expect.objectContaining({ api_key: expect.any(String)})
        // expect(response.body["api_key"].length).toBeGreaterThan(0);
    });
  });
});
