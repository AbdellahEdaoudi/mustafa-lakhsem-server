const rateLimit = require('express-rate-limit');

// General API limiter
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window`
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes"
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Stricter limiter for authentication
exports.authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per `window`
    message: {
        message: "Too many attempts from this IP, please try again after 15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for contact submissions (to prevent spam)
exports.contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 contact messages per hour
    message: {
        message: "Too many contact submissions from this IP, please try again after an hour"
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Stricter limiter for newsletter subscription
exports.subscribeLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // Limit each IP to 3 newsletter subscriptions per hour
    message: {
        message: "Too many subscription attempts from this IP, please try again after an hour"
    },
    standardHeaders: true,
    legacyHeaders: false,
});
