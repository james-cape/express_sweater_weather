var shell = require('shelljs');
var request = require("supertest");
var app = require('./../../../../app');

describe('api', () => {
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

  describe('Test POST /api/v1/users path', () => {
    describe('Test POST /api/v1/users path', () => {
      test('should return a 201 status with api key', () => {
        let params = {
          "email": "my_email@example.com",
          "password": "password",
          "password_confirmation": "password"
        }

        return request(app).post("/api/v1/users").send(params)
          .then(response => {
            debugger;
            expect(response.status).toBe(201),
            expect.objectContaining({ api_key: expect.any(String)}),
            expect(response.body["api_key"].length).toBeGreaterThan(0);
        });
      });
    });
  });
});
