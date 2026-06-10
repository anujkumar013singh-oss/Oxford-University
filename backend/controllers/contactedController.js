const Contacted = require('../models/Contacted');
const Lead = require('../models/Lead');

const createContacted = async (req, res) => {
  try {
    const { originalLeadId, conversationNotes } = req.body;

    const lead = await Lead.findById(originalLeadId);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    if (!conversationNotes || conversationNotes.trim().length < 100) {
      return res.status(400).json({
        success: false,
        error: 'Conversation notes must be at least 100 characters'
      });
    }

    const contacted = await Contacted.create({
      originalLeadId: lead._id,
      name: lead.name,
      phone: lead.phone || '',
      email: lead.email,
      interestedCourse: lead.interestedCourse,
      conversationNotes: conversationNotes.trim(),
      contactedBy: req.adminId || 'Admin'
    });

    await Lead.findByIdAndUpdate(originalLeadId, { contacted: true });

    res.status(201).json({
      success: true,
      data: contacted,
      message: 'Lead moved to contacted successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: messages
      });
    }
    console.error('Create contacted error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getContacted = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }
    if (req.query.course) filter.interestedCourse = req.query.course;

    const [contacted, total] = await Promise.all([
      Contacted.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contacted.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: contacted,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contacted error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { createContacted, getContacted };
