const express = require("express");

const slides = require("../data/slides.json");

const created = new Date();

const router = express.Router();
router.post("/", (req, res) => {
  res.status(200).send({
    success: true,
    data: getStats(),
  });
});
exports.router = router;

let cachedStats;
function getStats() {
  if (cachedStats) {
    return cachedStats;
  }

  const categories = slides.map((category) => {
    return {
      category: category.category,
      slides: category.slides.map((slide) => {
        return {
          title: slide.title,
          pages: slide.pages.length,
        };
      }),
    };
  });

  const stats = {
    categories: categories,
    created: created,
  };

  cachedStats = stats;
  return stats;
}
