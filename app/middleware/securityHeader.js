var helmet = require('helmet')

module.exports = function attachSecurityHeaders (app) {
  // Set security headers.
  app.use(helmet())

  // Configure Content Security Policy
  // Hashes for inline Gov Template script entries
  /* TODO add your CSP
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ['\'self\''],
      scriptSrc: ['\'self\'',
      'www.google-analytics.com',
      '\'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU=\'',          '\'sha256-G29/qSW/JHHANtFhlrZVDZW1HOkCDRc78ggbqwwIJ2g=\''],
      styleSrc: ['\'self\''],
      fontSrc: ['\'data:\''],
      imgSrc: ['\'self\'', 'www.google-analytics.com']
    }
  }))
  */
}
