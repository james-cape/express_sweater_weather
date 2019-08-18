var shell = require('shelljs');
var request = require("supertest");
var app = require('../../app');
var CoordinatesService = require('../../services/coordinates_service').CoordinatesService;

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

  test('turns city,state into lat/long'), () => {
    let service = new CoordinateService()

    let location = service.get_results('denver,co')

    expect.objectContaining({
      citystate: expect.any(String),
      country: expect.any(String),
      coordinates: expect.any({
        lat: expect.any(Float),
        lng: expect.any(Float)
      })
    })

    // expect(location).to have_key(:citystate)
    // expect(location).to have_key(:country)
    // expect(location).to have_key(:coordinates)
    // expect(location[:coordinates]).to have_key(:lat)
    // expect(location[:coordinates]).to have_key(:lng)

  }

})
