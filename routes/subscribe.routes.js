const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribe.controller');

// Public route to subscribe
router.post('/subscribe', subscribeController.subscribe);

module.exports = router;
