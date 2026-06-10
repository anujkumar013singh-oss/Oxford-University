const express = require('express');
const router = express.Router();
const { createContacted, getContacted } = require('../controllers/contactedController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, createContacted);
router.get('/', authenticate, getContacted);

module.exports = router;
