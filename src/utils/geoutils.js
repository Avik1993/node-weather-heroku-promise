const request = require('request')

const mapBoxURLProm = (address) => {
    return new Promise((resolve, reject) => {
        const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+process.env.MAPBOX_TOKEN+'&limit=1'
        const option = {
            url: mapboxURL, 
            json: true
        }
        request(option, (err, response) => {
            if (err) {
                reject({message: err.errno, code: err.code})
            } else if (response.body.features.length === 0) {
                reject({message: 'Unable to find geo-location', code: 400} )
            } else {
                resolve(response.body.features[0].geometry.coordinates)
            }
        })    
    })
}

module.exports = {
    mapBoxURLProm: mapBoxURLProm
}