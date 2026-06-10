require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

const PORT = process.env.PORT || 5000;

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existingAdmin) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: 'Admin'
      });
      console.log('Default admin seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

const start = async () => {
  await connectDB();
  await seedAdmin();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
