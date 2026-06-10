const express = require('express');
const router = express.Router();
const { login, refresh, logout } = require('../controllers/authController');
const { loginValidationRules, validate } = require('../middleware/validate');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/login', authLimiter, loginValidationRules, validate, login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
