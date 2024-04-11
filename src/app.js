const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Lea Albaugh"
    });
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lea Albaugh'
    })
})

// help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Can\'t help you.',
        name: 'Lea Albaugh'
    })
})

// weather page
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }

    const address = req.query.address
    geocode(address, (error, {lat, long, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: address,
                forecast: forecastData,
                location: location
            })
        })
    })
})

// 404 help page
app.get('/help/*', (req, res) => {
    res.render('404' , {
        title: '404',
        message: 'Help article not found!',
        name: 'Lea Albaugh'
    })
})

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        name: 'Lea Albaugh'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});