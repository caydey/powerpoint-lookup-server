const express = require('express')

const { elasticClient } = require('../elastic')


const router = express.Router();
router.post('/', (req, res) => {
  const query = req.body.query;
  if (typeof query === 'string') {
    elasticClient.search({
      index: 'slides',
      body: {
        query: {
          match: {
            content: {
              query: query,
              fuzziness: "AUTO"
            }
          }
        }
      }
    }).then((results) => {
      const slides = results.hits.hits.map(hit => {
        return {
          title: hit._source.title,
          number: hit._source.number
        }
      })

      res.status(200).send({
        success: true,
        data: {
          slides: slides
        }
      })
    }).catch((err) => {
      res.status(500).send({
        success: false,
        message: "database query error"
      })
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'query field not specified'
    })
  }
})


exports.router = router
