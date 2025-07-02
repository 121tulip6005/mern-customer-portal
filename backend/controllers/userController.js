const User = require('../models/User');

exports.getUserActions = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('actionHistory');
    res.json(user.actionHistory);
  } catch {
    res.status(500).json({ message: 'Failed to fetch action history' });
  }
};
