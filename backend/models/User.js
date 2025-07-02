const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  actionHistory: [
    {
      type: String,             // "escalate", "cancel", "return"
      orderId: String,          // Store as String for simplicity
      timestamp: Date
    }
  ]
});

module.exports = mongoose.model('User', userSchema);

