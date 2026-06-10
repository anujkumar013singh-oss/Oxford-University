const mongoose = require('mongoose');

const ContactedSchema = new mongoose.Schema({
  originalLeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  interestedCourse: {
    type: String,
    required: true
  },
  conversationNotes: {
    type: String,
    required: [true, 'Conversation notes are required'],
    minlength: [100, 'Conversation notes must be at least 100 characters'],
    trim: true
  },
  contactedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contacted', ContactedSchema);
