// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// npm
const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=bbd97e8f7a334e2ebc9155507240404&q=' + lat + ',' + long;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!');
        } else {
            callback(undefined,  response.body.current.condition.text + '. It is currently ' + response.body.current.temp_f + ' degrees out. There is a ' + response.body.forecast.forecastday[0].day.daily_chance_of_rain + '% chance of rain.');
                //{currentTemp: response.body.current.temp_f,
                //chanceOfRain: response.body.forecast.forecastday[0].day.daily_chance_of_rain,
                //currentCondition: response.body.current.condition.text}
        }
    })
}

module.exports = forecast;