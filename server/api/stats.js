const express = require('express')



const { elasticClient } = require('../elastic')

const router = express.Router();
router.post('/', (req, res) => {
  getStats((err, indexedSlides) => {
    if (err) {
      return res.status(500).send({
        success: false,
        message: err
      })
    }
    res.status(200).send({
      success: true,
      data: indexedSlides
    })
  })
})
exports.router = router


let cachedStats
function getStats(callback) {
  if (cachedStats) {
    return callback(null, cachedStats)
  }
  elasticClient.search({
    _source: ['title', 'number'],
    index: 'slides',
    size: 1000,
    body: {
      query: {
        match_all: {}
      }
    }
  }).then((result) => {
    const slides = result.hits.hits
    let titlePages = {}
    for (let i = 0; i < slides.length; i++) {
      const title = slides[i]._source.title
      if (title in titlePages) {
        titlePages[title]++
      } else {
        titlePages[title] = 0
      }
    }
    let indexedSlides = []
    for (key in titlePages) {
      indexedSlides.push({
        title: key,
        pages: titlePages[key]
      })
    }
    // db creation date
    elasticClient.indices.getSettings().then((result) => {
      const createdEpoc = result.slides.settings.index.creation_date;
      const createdDate = new Date(Math.floor(createdEpoc))
      const stats = {
        created: createdDate,
        slides: indexedSlides
      }
      callback(null, stats)
      cachedStats = stats
    }).catch((err) => {
      callback("database query error", null)
    })
  }).catch((err) => {
    callback("database query error", null)
  })
}