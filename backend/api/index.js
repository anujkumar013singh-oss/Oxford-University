require('dotenv').config();
const app = require('../app');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

let ready = false;

const init = async () => {
  try {
    await connectDB();
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Admin'
      });
    }
    ready = true;
  } catch (e) {
    console.error('Init error:', e.message);
  }
};

init();

module.exports = async (req, res) => {
  if (!ready) {
    res.status(503).json({ success: false, error: 'Server initializing, try again' });
    return;
  }
  return app(req, res);
};
