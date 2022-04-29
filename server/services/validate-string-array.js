

const isValidStringArray = function(arr) {
  // is array
  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    return false;
  }
  // only has string elements
  for (let i=0; i<arr.length; i++) {
    if (typeof arr[i] !== 'string') {
      return false;
    }
  }
  return true;
}
exports.isValidStringArray = isValidStringArray;