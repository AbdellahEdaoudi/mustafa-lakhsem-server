const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyJWT } = require('../middlewares/verifyJWT');
const { verifyRole } = require('../middlewares/verifyRole');

// Only authenticated admins can register new administrative accounts
router.post('/register', verifyJWT, verifyRole('admin'), userController.register);
router.post('/login', userController.login);
router.get('/refresh', userController.refresh);
router.post('/logout', userController.logout);

module.exports = router;