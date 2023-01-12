const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 100,
    message: "Error, you have reached maximum retries. Please try again after 1 hoour",
    statusCode: 429,
    headers: true,
});
module.exports = { loginRateLimiter }
