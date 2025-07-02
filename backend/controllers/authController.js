const User = require('../models/User');
const Order = require('../models/Order');

exports.login = async (req, res) => {
  const { emailOrPhone, password, orderId } = req.body;

  try {
    let user;

    if (password) {
      user = await User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
        password,
      });
    } else if (orderId) {
      const order = await Order.findById(orderId).populate('user');
      if (order && (order.user.email === emailOrPhone || order.user.phone === emailOrPhone)) {
        user = order.user;
      }
    }

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
