const mongoose = require('mongoose');

let cached = null;

const connectDB = async () => {
  if (cached) return cached;
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    cached = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    cached = null;
    throw error;
  }
};

module.exports = connectDB;
