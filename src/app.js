const express = require('express')
const path = require('path')

const weather = require('./utils/forecast.js')
const geoUtils = require('./utils/geoutils.js')
const hbs = require('hbs')

const publicDirPath = path.join(__dirname, '../public' )
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDirPath))

app.use('*.js', (req, res, next) => {
    res.set('Content-Type', 'text/javascript')
    next();
})

// Setting templating engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Adding routes to dynamic HBS files
app.get('', (req, res) => {
    // this will match files in 'views' folder
    // Takes 2 aruments, 1st - name of view
    // 2nd - object with all variables
    res.render('index', {
        title: 'Weather App',
        name: "Avik",
        footer: 'Welcome Footer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Avik",
        company: 'LunaticLazyProgrammer',
        footer: 'About Footer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Avik",
        help: 'Hi! what can i help you with?',
        footer: 'Help Footer'
    })
})

// Adding routes
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({data: null, error: 'Must provide address query', err_code: 400})
    }
    geoUtils.mapBoxURLProm(req.params.address)
    .then((result) =>{
        return weather.getWeather(result[0], result[1])
    })
    .then((result) => {
        res.send({data: result, error: null, err_code: null})
    })
    .catch((error) => {
        console.log('Error in Weather API : ', error.message)
        res.send({data: null, error: error.message, err_code: error.code})
    })
})

// Adding help specific wildcard before having universal wildcard
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Section not found',
        Section: "Help",
        footer: 'Please check back with correct HELP Request'
    })
})

// 404 page - use wildcard to match everything that hasn't been matched above
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        Section: "NA",
        footer: 'Please check back with correct request URL'
    })
})

// Starting server on port 3000
app.listen(port, () => {
    console.log('Server is up on port'+ port)
})


/*
app.post('/weathernested/:city', (req, res) => {
    geoUtils.mapBoxURLProm(req.params.city)
    .then((result) =>{
        weather.getWeather(result[0], result[1])
        .then((result) => {
            res.send({data: result, error: null, err_code: null})
        })
        .catch((error) => {
            console.log('Unable to get weather: ', error)
            res.send({data:null, error: error.info, err_code: error.code})
        })
    })
    .catch((error) => {
        console.log('Error in Geo Location API : ', error.message)
        res.send({data: null, error: error.message, err_code: 500})
    })
})
*/



// app.get('', (req, res) => {
//     res.send('hello express!')
//     // This will not be shown if `express.static` is set already.
// })

// app.get('/help', (req, res) => {
//     res.send('<h1>Help Page</h1></ br>I am here to help you!')
// })

// app.get('/about', (req, res) => {
//     res.send('About Page')
// })
