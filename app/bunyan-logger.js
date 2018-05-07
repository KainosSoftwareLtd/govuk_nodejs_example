var bunyan = require('bunyan')

// See alpha examples with serialisers and request/response middleware
var logger = bunyan.createLogger({
  name: 'govuk-nodejs-example',
  level: 'debug'
})

module.exports = logger
