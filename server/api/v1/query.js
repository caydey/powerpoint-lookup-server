const express = require('express')
const { querySlides } = require.main.require('./services/query-slides.js');
const { isValidStringArray } = require.main.require('./services/validate-string-array.js');

const router = express.Router();
router.post('/', (req, res) => {  // array of strings which a slide must have
  const keywords = req.body.keywords;
  if (keywords) {
    if (isValidStringArray(keywords)) {
      const slides = querySlides(keywords)
      res.status(200).send({
        success: true,
        slides: slides,
        keywords: keywords
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'keywords must be an array of strings'
      })
    }
  } else {
    res.status(400).send({
      success: false,
      message: 'keywords field not specified'
    })
  }
})


exports.router = router
