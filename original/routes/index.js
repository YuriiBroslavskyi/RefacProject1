const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Головна сторінка з переліком мандарин
router.get('/', orderController.getIndex);

// Обробка замовлення
router.post('/order', orderController.postOrder);

// Профіль користувача
router.get('/profile', orderController.getProfile);

module.exports = router;
