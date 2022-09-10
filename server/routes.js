// middleware imports
const limits = require('./middleware/rate-limits.js');
const { searchBroadcaster } = require('./middleware/search-broadcaster.js');

const query = require('./api/query.js');
const stats = require('./api/stats.js');

const routes = ((route) => {
  route.use(
    '/api/search',
    [
      limits.customLimit(32, 1),
      searchBroadcaster
    ],
    query.router
  );

  route.use(
    '/api/stats',
    limits.customLimit(32, 1),
    stats.router
  )
});
module.exports = routes;