// npm
const request = require('request');
const os = require('os');

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=bbd97e8f7a334e2ebc9155507240404&q=' + lat + ',' + long;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!');
        } else {
            var textResponse = response.body.current.condition.text + '. It is currently ' + response.body.current.temp_f + ' degrees out. \n Today\'s high is ' + response.body.forecast.forecastday[0].day.maxtemp_f + ' degrees and the low is ' + response.body.forecast.forecastday[0].day.mintemp_f + ' degrees. There is a ' + response.body.forecast.forecastday[0].day.daily_chance_of_rain + '% chance of rain.';
            callback(undefined,  textResponse);
        }
    })
}

module.exports = forecast;