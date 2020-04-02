const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/0b7640f53673863222872bd4ff5cad6f/' + latitude + ',' 
        + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +
            ' It is ' + body.currently.temperature + ' degrees out. There is a ' + 
            body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast