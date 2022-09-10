const { broadcastSearch } = require.main.require('./socket.js')

const { generateId } = require('./generate-header-id.js')

const searchBroadcaster = (req, res, next) => {
  next(); // continue serving request and continue
  // only log if valid query
  const query = req.body.query;
  if (typeof query === 'string') {
    const MAX_QUERY_LENGTH = 40;
    if (query.length > MAX_QUERY_LENGTH) {
      query = query.substring(0, MAX_QUERY_LENGTH - 3) + '...';
    }
    const id = generateId(req.headers);
    const search = {
      sender: id,
      query: query
    }
    broadcastSearch(search) // websocks broadcast
  }
}
exports.searchBroadcaster = searchBroadcaster;






