const mongoose = require('mongoose');
require('dotenv').config();

const User = require('User');
const Event = require('Event');

const seedDatabase = async () => {
  await User.deleteMany();
  await Event.deleteMany();

  const admin = await User.create({
    name: "Demo Admin",
    email: "admin@test.com",
    password: "eventHubb123",
    role: "admin"
  });

  const testEvent = await Event.create({
    title: "Global Tech Expo",
    date: new Date('2026-09-10'),
    category: "Technology",
    capacity: 200,
    ticketsLeft: 200
  });

  console.log("--- System Seeded: Admin & Initial Events Ready ---");
};


const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await seedDatabase();
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runSeed();