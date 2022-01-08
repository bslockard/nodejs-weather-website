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
            place: body.location.name + ', ' + body.location.region,
            descrip: body.current.weather_descriptions[0],
            humidity: body.current.humidity,
            feelslike: body.current.feelslike,
            forecastData: 'It is currently ' + body.current.temperature + ' degrees, feels like ' + body.current.feelslike + '. Humidity is ' + body.current.humidity + '% with a ' + body.current.precip + '% chance of rain'
        })
    }
})
}


module.exports = forecast
