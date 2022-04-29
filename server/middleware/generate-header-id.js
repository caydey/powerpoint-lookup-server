const NAMES = require.main.require('./data/names.json');
const crypto = require('crypto');

const generateId = function(headers) {
  var ip = headers['x-forwarded-for'];
  var ua = headers['user-agent'];
  if (!ip) ip = '0.0.0.0';
  if (!ua) ua = '';
  var generator = crypto.createHash('sha1')
  generator.update(ip)
  generator.update(ua)
  const seed = generator.digest().readUInt32LE(); // convert hash to 32bit number
  const index = seed % NAMES.length;
  const name = NAMES[index];
  return name;
}
exports.generateId = generateId;