const mongoose = require('mongoose');
const User = require('../models/User');
const Order = require('../models/Order');
const connectDB = require('../config/db');
require('dotenv').config();

const seed = async () => {
  await connectDB();

  await User.deleteMany();
  await Order.deleteMany();

  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    password: '123456',
  });

  await Order.insertMany([
    {
      productName: 'iPhone 14',
      status: 'Shipped',
      price: 999,
      orderDate: new Date(),
      expectedDelivery: new Date(Date.now() + 5 * 86400000),
      user: user._id,
    },
  ]);

  console.log('Seeded!');
  process.exit();
};

seed();
