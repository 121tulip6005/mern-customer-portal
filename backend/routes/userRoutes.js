const express = require('express');
const router = express.Router();
const { getUserActions } = require('../controllers/userController');

router.get('/:id/actions', getUserActions);

module.exports = router;
