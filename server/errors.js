
// error handlers
const notFoundError = function(req, res, next) {
  res.status(404).send({ error: 'Not found' });
}
const clientErrorHandler = function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
const errorHandler = function(err, req, res) {
  res.status(500).send({ error: 'Server error' });
}

module.exports = (app) => {
  app.use(notFoundError);
  app.use(clientErrorHandler);
  app.use(errorHandler);
}