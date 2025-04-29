const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController')

router.get('/', controller.wrap(controller.getIndex));
router.post('/order', controller.wrap(controller.postOrder));
router.get('/profile', controller.wrap(controller.getProfile));

module.exports = router;
