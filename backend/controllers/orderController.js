const Order = require('../models/Order');
const User = require('../models/User');

const logAction = async (userId, orderId, type) => {
  const timestamp = new Date().toISOString();
  const action = { type, orderId, timestamp };
  await User.findByIdAndUpdate(userId, { $push: { actionHistory: action } });
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

exports.escalate = async (req, res) => {
  try {
    const { userId } = req.body;
    const orderId = req.params.id;
    await logAction(userId, orderId, 'escalate');
    res.json({ message: `Issue escalated for order ${orderId}` });
  } catch {
    res.status(500).json({ message: 'Failed to escalate issue' });
  }
};

exports.cancel = async (req, res) => {
  try {
    const { userId } = req.body;
    const orderId = req.params.id;
    await logAction(userId, orderId, 'cancel');
    res.json({ message: `Cancellation requested for order ${orderId}` });
  } catch {
    res.status(500).json({ message: 'Failed to cancel order' });
  }
};

exports.returnOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orderId = req.params.id;
    await logAction(userId, orderId, 'return');
    res.json({
      message: `Return initiated for order ${orderId}`,
      pickup: 'Ekart pickup scheduled (dummy)'
    });
  } catch {
    res.status(500).json({ message: 'Failed to initiate return' });
  }
};
