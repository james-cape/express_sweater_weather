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

  describe('Test POST /api/v1/sessions path', () => {
    describe('Test POST /api/v1/sessions path', () => {

      test('should return a 200 status with api key', () => {
        let params = {
          "email": "my_email@example.com",
          "password": "password",
        }

        return request(app).post("/api/v1/sessions").send(params)
          .then(response => {
            expect(response.status).toBe(200),
            expect.objectContaining({ api_key: expect.any(String)}),
            expect(response.body["api_key"].length).toBeGreaterThan(0);
        });
      });
      //
      // test('unmatching passwords should return a 401 status and error', () => {
      //   let params = {
      //     "email": "my_email@example.com",
      //     "password": "password",
      //     "password_confirmation": "wrong_password"
      //   }
      //
      //   return request(app).post("/api/v1/sessions").send(params)
      //     .then(response => {
      //       expect(response.status).toBe(401),
      //       expect(response.body).toMatchObject({error: "Passwords do not match"});
      //   });
      // });
      //
      // test('missing email', () => {
      //   let params = {
      //     "email": null,
      //     "password": "password",
      //     "password_confirmation": "password"
      //   }
      //
      //   return request(app).post("/api/v1/sessions").send(params)
      //     .then(response => {
      //       expect(response.status).toBe(401),
      //       expect(response.body).toMatchObject({error: "Missing an entry"});
      //   });
      // });
      //
      // test('missing password', () => {
      //   let params = {
      //     "email": "my_email@example.com",
      //     "password": null,
      //     "password_confirmation": "password"
      //   }
      //
      //   return request(app).post("/api/v1/sessions").send(params)
      //     .then(response => {
      //       expect(response.status).toBe(401),
      //       expect(response.body).toMatchObject({error: "Missing an entry"});
      //   });
      // });
      //
      // test('missing password_confirmation', () => {
      //   let params = {
      //     "email": "my_email@example.com",
      //     "password": "password",
      //     "password_confirmation": null
      //   }
      //
      //   return request(app).post("/api/v1/sessions").send(params)
      //     .then(response => {
      //       expect(response.status).toBe(401),
      //       expect(response.body).toMatchObject({error: "Missing an entry"});
      //   });
      // });
    });
  });
});
