const { isValidStringArray } = require.main.require('./services/validate-string-array.js');
const { broadcastSearch } = require.main.require('./socket.js')

const { generateId } = require('./generate-header-id.js')

const searchBroadcaster = (req,res,next) => {
  next(); // continue serving request and continue
  // only log if valid query
  const keywords = req.body.keywords;
  if (isValidStringArray(keywords)) {
    const formattedParams = formatParams(keywords)
    const id = generateId(req.headers);
    const search = {
      sender: id,
      keywords: formattedParams
    }
    broadcastSearch(search) // websocks broadcast
  }
}
exports.searchBroadcaster = searchBroadcaster;



const MAX_PARAM_LENGTH = 40;
const MAX_PARAMS = 3;
function formatParams(params) {
  var formatted = '';
  for (let i=0; i<params.length; i++) {
    if (i == MAX_PARAMS) {
      break;
    }
    var param = params[i];
    if (param) {
      if (param.length > MAX_PARAM_LENGTH) {
        param = param.substring(0, MAX_PARAM_LENGTH-3) + '...';
      }
      if (i > 0) { // no starting comma
        formatted+=', ';
      }
      formatted+=`"${param}"`;
    }
  }
  return formatted;
}


