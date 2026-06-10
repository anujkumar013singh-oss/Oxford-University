require('dotenv').config();
const app = require('../app');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

let connectionPromise = null;

const getConnection = () => {
  if (!connectionPromise) {
    connectionPromise = (async () => {
      await connectDB();
      const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
      if (!existing) {
        await Admin.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          name: 'Admin'
        });
      }
    })();
  }
  return connectionPromise;
};

module.exports = async (req, res) => {
  try {
    await getConnection();
    return app(req, res);
  } catch (e) {
    console.error('Init error:', e.message);
    res.status(500).json({ success: false, error: e.message });
  }
};
