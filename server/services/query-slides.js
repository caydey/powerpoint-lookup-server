const SLIDES = require.main.require('./data/slides-text.json')


const querySlides = function(keywords) {
  var keywordsUpper = keywords.map((keyword) => keyword.toUpperCase() )
  var slides = []
  for (let slide in SLIDES) { // foreach powerpoint slide
    const contents = SLIDES[slide]
    var matches = true
    // slide must contain all keywords
    for (let i=0; i<keywordsUpper.length; i++) { // foreach keyword
      // if (contents.search(keywordsUpper[i]) == -1) {
      if (!testString(contents, keywordsUpper[i])) {
        matches = false;
        break;
      }
    }
    if (matches) {
      slides.push(slide)
    }
  }
  return slides
}
exports.querySlides = querySlides

// own string search function as String.search can be crashed by string regex injection
function testString(string, word) {
  var w = 0;
  for (let c=0; c<string.length; c++) {
    var char = string[c];
    var focus = word[w];
    if (char != focus) {
      w = -1;
    }
    w++;
    if (w == word.length) // found
      return true;
  }
  return false;
}