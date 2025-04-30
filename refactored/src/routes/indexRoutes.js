// src/routes/indexRoutes.js
const express = require('express');
const router = express.Router();
const order = require('../controllers/OrderController');

router.get('/', order.getIndex);
router.post('/order', order.postOrder);
router.get('/profile', order.getProfile);

module.exports = router;
