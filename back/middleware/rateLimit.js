const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 3,
    windowMs: 60 * 60 * 1000,
    message: "Trop de requête pour cette IP"
});

module.exports = limiter;