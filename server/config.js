let ELASTIC_HOST = 'http://database:9200' // docker
if (process.env.NODE_ENV === 'development') {
  ELASTIC_HOST = 'http://localhost:9200'
}

module.exports = {
  ELASTIC_HOST: ELASTIC_HOST
}