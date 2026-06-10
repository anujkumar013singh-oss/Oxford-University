const express = require('express');
const router = express.Router();
const { createLead, getLeads, getLead, updateLead, deleteLead } = require('../controllers/leadController');
const { leadValidationRules, validate } = require('../middleware/validate');
const { leadSubmitLimiter } = require('../middleware/rateLimiter');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', leadSubmitLimiter, leadValidationRules, validate, createLead);
router.get('/', authenticate, getLeads);
router.get('/:id', authenticate, getLead);
router.patch('/:id', authenticate, updateLead);
router.delete('/:id', authenticate, deleteLead);

module.exports = router;
