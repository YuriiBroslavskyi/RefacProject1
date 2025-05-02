const BaseController = require('./BaseController');
const { orderFacade, notifier, validatorChain } = require('../container');
const { mandarinRepo } = require('../container');

class OrderController extends BaseController {
    getIndex = async (req, res) => {
        if (!req.session.userId) return res.redirect('/login');
        const mandarins = await mandarinRepo.findAll();
        const msg = req.session.lastMessage;
        res.render('index', { mandarins, message: msg });
        req.session.lastMessage = null;
    };

    postOrder = this.wrap(async (req, res) => {
        if (!req.session.userId) return res.redirect('/login');
        await validatorChain.validate(req);
        const order = await orderFacade.placeOrder(req.body.id, req.session);
        notifier.notify(req.session, `Ви успішно замовили: ${order.name}`);
        res.redirect('/profile');
    });

    getProfile = async (req, res) => {
        if (!req.session.userId) return res.redirect('/login');
        const orders = await orderFacade.getOrders(req.session);
        res.render('profile', { orders });
    };
}

module.exports = new OrderController();
