const mandarinModel = require('../models/mandarinModel');
const orderModel = require('../models/orderModel');

exports.getIndex = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    const mandarins = await mandarinModel.getAllMandarins();
    res.render('index', { mandarins });
};

exports.postOrder = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    const mandarinId = parseInt(req.body.id, 10);
    await orderModel.createOrder(req.session.userId, mandarinId);
    res.redirect('/profile');
};

exports.getProfile = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    const orders = await orderModel.getOrdersByUser(req.session.userId);
    res.render('profile', { orders });
};
