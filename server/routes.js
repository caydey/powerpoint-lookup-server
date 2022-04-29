// middleware imports
const limits = require('./middleware/rate-limits.js');
const { searchBroadcaster } = require('./middleware/search-broadcaster.js');

const query = require('./api/v1/query.js');

const routes = ((route) => {
  route.use(
    '/api/v1/query',
    [
      limits.customLimit(32,1),
      searchBroadcaster
    ],
    query.router
  );
});
module.exports = routes;