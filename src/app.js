const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// paths for Express
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup for handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// Setup static directery
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bernie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Bernie'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This page is here to help you out',
        title: 'Help',
        name: 'Bernie'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, {temperature, precip, forecastData} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                temperature,
                precip                       
            })
        })
    })
        
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search, req.query.qty)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        pageMissingText: 'Help article not found',
        title: '404 - Error',
        name: 'Bernie'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        pageMissingText: 'Page not found',
        title: '404 - Error',
        name: 'Bernie'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


