const rateLimit = require('express-rate-limit');


exports.customLimit = function(max, window) {
  const LIMIT = rateLimit({
    windowMs: window * 60 * 1000,
    max: max,
    message: {
      success: false,
      message: `api limit reached for this function, ${max} requests per ${window} minute${window == 1 ? '' : 's'}`,
      rate: {
        window: window * 60 * 1000,
        max: max
      }
    },
    standardHeaders: true, // `RateLimit-*` headers
    legacyHeaders: false,
  });
  return LIMIT;
}

