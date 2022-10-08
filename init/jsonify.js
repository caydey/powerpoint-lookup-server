

const fs = require('fs')
const path = require('path')

const slidesPath = process.argv[2]


var categoriesJson = []
const categories = fs.readdirSync(slidesPath)// category
categories.forEach(category => {
  const categoryPath = path.join(slidesPath, category)
  if (!fs.lstatSync(categoryPath).isDirectory()) {
    return
  }
  const slideshows = fs.readdirSync(categoryPath) // slideshow
  const categoryJson = []
  slideshows.forEach(slideshow => {
    slideshowJson = {}
    const slideshowPath = path.join(categoryPath, slideshow)
    const slides = fs.readdirSync(slideshowPath) // slides
    var pages = Array(slides.length / 2)
    slides.forEach(slide => {
      if (slide.endsWith(".txt")) {
        const index = Number(slide.slice(0, -4)) - 1
        const contents = fs.readFileSync(path.join(slideshowPath, slide), 'utf8').slice(0, -1)
        pages[index] = contents
      }
    })
    slideshowJson.title = slideshow
    slideshowJson.pages = pages
    categoryJson.push(slideshowJson)
  })
  categoriesJson.push({
    category: category,
    slides: categoryJson
  })
})
console.log(JSON.stringify(categoriesJson));
/*
[
  category: "info_sec"
  slides: [
    {
      title: "what_are_sockets",
      location: "info_sec/what_are_sockets"
      pages: [
        "sockets are a thing, that we will understand... and then",
        "thats for watching"
      ]
    },
    {
      title: "T0-Introduction"
      location: "info_sec/T0-Introduction"
      pages: [
        "welcome",
        "goodbye"
      ]
    }
  ]
]
*/
