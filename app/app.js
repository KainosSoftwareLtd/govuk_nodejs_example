var express = require('express')
var nunjucks = require('express-nunjucks')
var path = require('path')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
const attachSecurityHeaders = require('./middleware/securityHeader')
const attachErrorHandling = require('./middleware/errorHandling')

var compression = require('compression')

var routeIndex = require('./routes/index')

var app = express()

// Use gzip compression - remove if possible via reverse proxy/Azure gateway
app.use(compression())

// Set security headers
attachSecurityHeaders(app) // Helmet security headers and CSP

var packageJson = require('../package.json')
var developmentMode = app.get('env') === 'development'
var releaseVersion = packageJson.version
var serviceName = 'Example service'
var cookieText = 'GOV.UK uses cookies to make the site simpler. <a href="#" title="Find out more about cookies">Find out more about cookies</a>'

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

nunjucks(app, {
  watch: developmentMode,
  noCache: developmentMode
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_template')))
app.use('/public', express.static(path.join(__dirname, 'govuk_modules', 'govuk_frontend_toolkit')))
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'images', 'favicon.ico')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// send assetPath to all views
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  next()
})

// Add variables that are available in all views
app.use(function (req, res, next) {
  res.locals.serviceName = serviceName
  res.locals.cookieText = cookieText
  res.locals.releaseVersion = 'v' + releaseVersion
  next()
})

// index route will mount itself with any required dependencies
routeIndex(app)

attachErrorHandling(app)

module.exports = app
