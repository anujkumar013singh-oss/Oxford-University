const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    index: true
  },
  interestedCourse: {
    type: String,
    required: [true, 'Course interest is required'],
    enum: [
      'B.Tech / Engineering',
      'MBBS / Medicine',
      'MBA / Business',
      'B.A. / Arts & Humanities',
      'B.Sc. / Science',
      'LLB / Law',
      'BCA / Computer Applications',
      'Other / Not Sure Yet'
    ]
  },
  source: {
    type: String,
    default: 'website_chatbot'
  },
  page: String,
  userAgent: String,
  contacted: {
    type: Boolean,
    default: false
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
