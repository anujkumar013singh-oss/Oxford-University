const { body, validationResult } = require('express-validator');

const leadValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim(),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('interestedCourse')
    .trim()
    .isIn([
      'B.Tech / Engineering',
      'MBBS / Medicine',
      'MBA / Business',
      'B.A. / Arts & Humanities',
      'B.Sc. / Science',
      'LLB / Law',
      'BCA / Computer Applications',
      'Other / Not Sure Yet'
    ])
    .withMessage('Invalid course selection'),
  body('source')
    .optional()
    .trim()
    .isString()
];

const loginValidationRules = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

module.exports = { leadValidationRules, loginValidationRules, validate };
