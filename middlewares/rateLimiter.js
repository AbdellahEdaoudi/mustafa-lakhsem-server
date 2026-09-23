const rateLimit = require('express-rate-limit');

// General API limiter
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: {
        message: "Too many requests, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for authentication
exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per `window`
    message: {
        message: "Too many attempts, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for contact submissions (to prevent spam)
exports.contactLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours (1 day)
    max: 5, // Limit each IP to 5 contact messages per day
    message: {
        message: "Too many contact submissions, please try again after 24 hours"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for newsletter subscription
exports.subscribeLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 1 day 24 hours
    max: 3, // Limit each IP to 3 newsletter subscriptions per day
    message: {
        message: "Too many subscription attempts, please try again after 24 hours"
    },
    standardHeaders: true,
    legacyHeaders: false,
});
