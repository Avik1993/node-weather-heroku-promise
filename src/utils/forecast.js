const request = require('request')

const getWeather = (lat, long) => {
    return new Promise((resolve, reject) => {
        const url = 'http://api.weatherstack.com/current?access_key='+process.env.WEATHER_TOKEN+'&query='+lat+','+long+'&units=f'
        const options = {
            url: url,
            json: true
        }
        request(options/*{url: url, json: true}*/, (err, response) => {
            if (err != undefined) {
                reject({message: err, code: 400})
            } else if (response.body.error) {
                reject({message: response.body.error, code: 500 })
            } else {
                resolve('Current Temperature is ' + response.body.current.temperature+ ' and feels like ' + response.body.current.feelslike)
            }
        })    
    })
}

module.exports = {
    getWeather: getWeather
}