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
    test('should return a 201 status', () => {
      let params = {
        "email": "my_email@example.com",
        "password": "password",
        "password_confirmation": "password"
      }

      return request(app).post("/api/v1/users").then(response => {
        expect(response.status).toBe(201)
      });
    });


    // test('should return an array of game objects', () => {
    //   return request(app).get("/api/v1/games").then(response => {
    //     expect(response.body.length).toEqual(4),
    //     expect(Object.keys(response.body[0])).toContain('title')
    //     expect(Object.keys(response.body[0])).toContain('price'),
    //     expect(Object.keys(response.body[0])).toContain('releaseYear'),
    //     expect(Object.keys(response.body[0])).toContain('active')
    //   })
    // });
  });
});
