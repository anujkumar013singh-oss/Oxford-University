const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
    const { name, phone, email, interestedCourse, source, page, userAgent } = req.body;

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone ? phone.trim() : undefined,
      email: email.trim().toLowerCase(),
      interestedCourse,
      source: source || 'website_chatbot',
      page: page || '',
      userAgent: userAgent || ''
    });

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead saved successfully'
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
    console.error('Create lead error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.course) filter.interestedCourse = req.query.course;
    if (req.query.contacted !== undefined) filter.contacted = req.query.contacted === 'true';
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) filter.createdAt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) filter.createdAt.$lte = new Date(req.query.endDate);
    }
    if (req.query.search) {
      filter.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Lead.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const updateLead = async (req, res) => {
  try {
    const { contacted, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { ...(contacted !== undefined && { contacted }), ...(notes !== undefined && { notes }) },
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead, message: 'Lead updated successfully' });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

module.exports = { createLead, getLeads, getLead, updateLead, deleteLead };
