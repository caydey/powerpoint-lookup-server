const express = require("express");

const slides = require("../data/slides.json");

const { DATA_HOST } = require("../config.js");

const router = express.Router();
router.post("/", (req, res) => {
  const category = req.body.category;
  const query = req.body.query;
  if (typeof query !== "string" || typeof category !== "string") {
    return res.status(400).send({
      success: false,
      message: "category & query not specified",
    });
  }

  try {
    var slides = querySlides(category, query);
    res.status(200).send({
      success: true,
      data: slides,
    });
  } catch (e) {
    return res.status(400).send({
      success: false,
      message: e.message,
    });
  }
});

const querySlides = (category, query) => {
  const queryUpper = query.toUpperCase();
  const focusCategory = slides.find((c) => c.category === category);
  if (!focusCategory) {
    throw new Error("Category not found");
  }

  let matches = [];
  focusCategory.slides.forEach((cat) => {
    for (let i = 0; i < cat.pages.length; i++) {
      const location = `${DATA_HOST}/${category}/${cat.title}/${i}.jpg`;
      if (queryString(cat.pages[i], queryUpper)) {
        matches.push({
          title: cat.title,
          number: i + 1,
          location: location,
        });
      }
    }
  });
  return matches;
};

const queryString = (string, query) => {
  let i = 0;
  let queryIndex = 0;
  while (i < string.length) {
    if (query[queryIndex] === string[i]) {
      queryIndex++;
    } else {
      queryIndex = 0;
    }
    if (queryIndex === query.length) {
      return true;
    }
    i++;
  }
  return false;
};

exports.router = router;
