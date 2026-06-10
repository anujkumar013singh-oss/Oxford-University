require('dotenv').config();
const app = require('../app');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

let connected = false;

const seedAdmin = async () => {
  try {
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Admin'
      });
    }
  } catch (e) {
    console.error('Seed admin error:', e.message);
  }
};

module.exports = async (req, res) => {
  if (!connected) {
    await connectDB();
    await seedAdmin();
    connected = true;
  }
  return app(req, res);
};
