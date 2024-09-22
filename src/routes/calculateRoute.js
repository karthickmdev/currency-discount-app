const express = require('express');
const router = express.Router();
const {
  calculatePayableAmount,
} = require('../controllers/calculateController');
const { authenticate } = require('../middlewares/authMiddleware');

router.post('/calculate', authenticate, calculatePayableAmount);

module.exports = router;
