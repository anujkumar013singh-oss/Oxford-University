const rateLimit = require('express-rate-limit');

const leadSubmitLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Too many submissions. Please try again later.' },
  standardHeaders: true
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many auth requests.' }
});

module.exports = { leadSubmitLimiter, authLimiter };
