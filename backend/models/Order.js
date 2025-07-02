const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: String,
  status: String,
  price: Number,
  orderDate: Date,
  expectedDelivery: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Order', orderSchema);
