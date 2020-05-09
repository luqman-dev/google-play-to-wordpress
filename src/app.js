const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts')

var app = express()
var port = process.env.PORT || 9000

// Set template engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Set starting routes
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/web.routes'))
app.use('/', require('./routes/api.routes'))

// Set port
app.listen(port)
console.log(`Live on port ${global.gConfig.apps.port}`)