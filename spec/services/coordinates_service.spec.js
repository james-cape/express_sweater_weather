var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var CoordinatesService = require('../../services/coordinates_service');
require('dotenv').config()

describe('CoordinatesService', () => {
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

  test('turns city,state into lat/long', async () => {
    let service = new CoordinatesService('denver,co');
    debugger;
    var service1 = await service.getResults()
    // return service.getResults()
    .then(response => {
      expect(response.status).toBe(200);
      expect.objectContaining({
        citystate: expect.any(String),
        country: expect.any(String),
        coordinates: expect.any({
          lat: expect.any(Float),
          lng: expect.any(Float)
        })
      });
    })
  });
})
