var shell = require('shelljs');
var request = require("supertest");
var app = require('./../../../../app');
var User = require('./../../../../models').User;

const bcrypt = require('bcrypt');

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

        return User.create({
            email: "my_email@example.com",
            password: bcrypt.hashSync("password", 10),
            apiKey: "12345"
        })
        .then (user => {
          return request(app).post("/api/v1/sessions").send(params)
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect.objectContaining({ api_key: expect.any(String)}),
            expect(response.body["api_key"].length).toBeGreaterThan(0);
        });
      });

      test('missing email', () => {
        let params = {
          "email": null,
          "password": "password",
        }

        return User.create({
            email: "my_email@example.com",
            password: bcrypt.hashSync("password", 10),
            apiKey: "12345"
        })
        .then (user => {
          return request(app).post("/api/v1/sessions").send(params)
        })
        .then(response => {
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({error: "Missing an entry"});
        });
      });

      test('missing password', () => {
        let params = {
          "email": "my_email@example.com",
          "password": null,
        }

        return User.create({
            email: "my_email@example.com",
            password: bcrypt.hashSync("password", 10),
            apiKey: "12345"
        })
        .then (user => {
          return request(app).post("/api/v1/sessions").send(params)
        })
        .then(response => {
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({error: "Missing an entry"});
        });
      });

      test('wrong password', () => {
        let params = {
          "email": "my_email@example.com",
          "password": "wrong_password",
        }

        return User.create({
            email: "my_email@example.com",
            password: bcrypt.hashSync("password", 10),
            apiKey: "12345"
        })
        .then (user => {
          return request(app).post("/api/v1/sessions").send(params)
        })
        .then(response => {
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({error: "Incorrect password"});
        });
      });

      test('no email on file', () => {
        let params = {
          "email": "your_email@example.com",
          "password": "password",
        }
        return User.create({
            email: "my_email@example.com",
            password: bcrypt.hashSync("password", 10),
            apiKey: "12345"
        })
        .then (user => {
          return request(app).post("/api/v1/sessions").send(params)
        })
        .then(response => {
            expect(response.status).toBe(401);
            expect(response.body).toMatchObject({error: "That email address is not on file"});
        });
      });
    });
  });
});
