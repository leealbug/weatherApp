// npm
const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.geocod.io/v1.7/geocode?api_key=e02e6006d562d2d6b656f62f2d2e265cfe62e2e&q=' + encodeURIComponent(address);

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to the location service!', undefined);
        } else if (body.error || body.results.length === 0) {
            callback('Invalid address! Try another search.');
        } else {
            callback(undefined, {
                lat: body.results[0].location.lat,
                long: body.results[0].location.lng,
                location: body.results[0].formatted_address
            })
        }
    })

};

module.exports = geocode;