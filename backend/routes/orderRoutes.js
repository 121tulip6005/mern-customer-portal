const express = require('express');
const {
  getOrders,
  escalate,
  cancel,
  returnOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.get('/:userId', getOrders);
router.post('/:id/escalate', escalate);
router.post('/:id/cancel', cancel);
router.post('/:id/return', returnOrder);

module.exports = router;
