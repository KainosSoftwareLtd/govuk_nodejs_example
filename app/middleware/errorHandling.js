module.exports = function attachErrorHandling (app) {
// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render(err.status !== 404 ? 'includes/error' : 'includes/error-404')
  })
}
