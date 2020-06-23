const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts')

var app = express()

// Set template engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// Set starting routes
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/web.routes'))
app.use('/', require('./routes/api.routes'))

// Set port
app.listen(global.gConfig.apps.port, global.gConfig.apps.ipAddress, function () {
    console.log(`Live on ip address ${global.gConfig.apps.ipAddress} port ${global.gConfig.apps.port}`)
})