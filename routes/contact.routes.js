const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');

// Public route to submit contact inquiry
router.post('/', contactController.createContact);

module.exports = router;