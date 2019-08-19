# Introduction
Based on Backend Mod 4 [project requirements](https://backend.turing.io/module4/projects/express_sweater_weather/express_sweater_weather_spec) set forth by [Turing School of Software and Design](https://turing.io/).

## Welcome to Express Sweater Weather!
This project allows users to register, login, and retrieve a forecast for a location via API calls and responses.

#### Future Iterations
Future iterations of this project will include:
* Favoriting Locations
* Listing Favorite Locations
* Removing Favorite Locations


#### Learning Goals
* Utilize a project board to create and track details for project completion
* Practice written technical communication with concise and consistent git commits and clear pull requests
* Clearly document Introduction, Initial Setup, How to Use, Known Issues, Running Tests, How to Contribute, Core Contributors, Schema Design, and Tech Stack List
* Implement testing in JavaScript
* Familiarize self with mechanics of building an Express API

#### Heroku Link
https://stormy-retreat-53831.herokuapp.com/

# Initial Setup
#### Requirements
[Node 10.16.2](https://nodejs.org/en/download/package-manager/)

[Jest](https://jestjs.io/): testing
```
$ npm install jest -g
$ npm install babel-jest supertest shelljs -D
```

[dotenv](https://www.npmjs.com/package/dotenv): sensitive environment variables
```
$ npm install dotenv
```

[bcrypt](https://www.npmjs.com/package/bcrypt): password management
```
npm install bcrypt
```

# How to Use

#### Installation
```
$ git clone https://github.com/james-cape/express_sweater_weather.git
$ cd express_sweater_weather
npm install
```

#### Database
```
$ npx db:create
$ npx db:migrate
```

#### Environment Variables
```
$ touch .env
$ echo "GEOCODE_GOOGLE_API_KEY=ABCDEFGHIJKLMNOPQRSTUVWXYZ" >> .env
$ echo "DARK_SKY_API_KEY=ABCDEFGHIJKLMNOPQRSTUVWXYZ" >> .env
```
^^ Get your API keys at [Dark Sky's](https://darksky.net/dev) and [Google's](https://developers.google.com/maps/documentation/embed/get-api-key) developer pages.

## Endpoints
#### Account Creation
Request:
```
POST https://stormy-retreat-53831.herokuapp.com/api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```

Example Response:
```
status: 201
body:

{
  "api_key": "ABcdEFg",
}
```

#### Login
Request:
```
POST https://stormy-retreat-53831.herokuapp.com/api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```

Example Response:
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

#### Forecast for City
Request:
```
GET https://stormy-retreat-53831.herokuapp.com/api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```

Example Response:
```
The response below is an example that gives only 1 object in the data array for both the hourly and daily. Your response should contain at least 8 hourly objects and 7 daily objects

{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```

# Known Issues
#### Future iterations not yet completed:
* Favoriting Locations
* Listing Favorite Locations
* Removing Favorite Locations

#### Testing
Not all edge cases are tested or functional, such as checking whether an API key or email is unique.

# Running Tests (Using Jest)
```
$ npm test
```
