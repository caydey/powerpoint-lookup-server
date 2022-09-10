const { Client } = require('@elastic/elasticsearch')

const { ELASTIC_HOST } = require('./config')

const client = new Client({
  node: ELASTIC_HOST,
  auth: {
    username: 'elastic',
    password: 'pass'
  }
})

exports.elasticClient = client