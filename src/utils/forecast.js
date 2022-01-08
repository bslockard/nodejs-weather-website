const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=752915a9170b6c0284463de64400f66f&units=f&query='+ latitude + ',' + longitude      
    request({ url, json: true }, (error, response, body) => {
    if (error) {
        callback('Unable to connect to network weather service')
    } else if (body.error) {
        callback('Unable to find location')
    } else {
        callback(undefined, {
            temperature: body.current.temperature,
            precip: body.current.precip,
            forecastData: 'It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain',
            place: body.location.name + ', ' + body.location.region
        })
    }
})
}


module.exports = forecast
