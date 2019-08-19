class forecastSerializer {
  constructor (forecast, location) {
    this.location = location,
    this.currently = JSON.parse(forecast)["currently"],
    this.hourly = JSON.parse(forecast)["hourly"]["data"].slice(0, 8), // 8 hourly objects
    this.daily = JSON.parse(forecast)["daily"]["data"].slice(0, 7) // 7 daily objects
    debugger;
  }
}

module.exports = forecastSerializer;
