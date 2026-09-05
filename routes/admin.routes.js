const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { verifyJWT } = require('../middlewares/verifyJWT');
const { verifyRole } = require('../middlewares/verifyRole');

// Apply authentication and role check to all admin routes
router.use(verifyJWT);
router.use(verifyRole('admin'));

// Admin contact management routes
router.get('/contacts', adminController.getContacts);
router.patch('/contacts/:id/read', adminController.updateReadStatus);
router.patch('/contacts/:id/star', adminController.updateStarredStatus);
router.delete('/contacts/:id', adminController.deleteContact);

// Admin newsletter subscribers route
router.get('/subscribers', adminController.getSubscribers);
router.delete('/subscribers/:id', adminController.deleteSubscriber);

module.exports = router;

