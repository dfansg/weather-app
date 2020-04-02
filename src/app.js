const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up static directory to serve
app.use(express.static(publicDirectoryPath))

// setup handlerbars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel Fan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel Fan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'I am here to help',
        name: 'Daniel Fan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode (req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            } 
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404page', {
        title: 404,
        name: 'Daniel Fan',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 404,
        name: 'Daniel Fan',
        errorMessage: 'Page not found!'
    })
})

// app.com

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})