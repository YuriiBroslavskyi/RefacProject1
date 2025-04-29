// refactored/src/controllers/orderController.js

const BaseController = require('./BaseController');
const container = require('../container');
const mandarins = require('../config/mandarins');

class OrderController extends BaseController {
    constructor(facade, notifier, validatorChain) {
        super();
        this.facade = facade;
        this.notifier = notifier;
        this.validatorChain = validatorChain;
    }

    // GET /
    getIndex = async (req, res) => {
        res.render('index', {
            mandarins,
            message: req.session.lastMessage || null
        });
        req.session.lastMessage = null;
    };

    // POST /order
    postOrder = async (req, res) => {
        try {
            // якщо id відсутній/неправильний → помилка
            this.validatorChain.validate(req);

            // спробуємо створити замовлення
            const order = this.facade.placeOrder(req.body.id, req.session);

            // успішно — задаємо повідомлення
            this.notifier.notify(req.session, `Ви успішно замовили: ${order.name}`);
        } catch (err) {
            // будь-яка помилка трактуємо як “товару не знайдено”
            req.session.lastMessage = 'Помилка: такого товару не знайдено.';
            return res.redirect('/');
        }

        return res.redirect('/');
    };

    // GET /profile
    getProfile = async (req, res) => {
        const orders = this.facade.getAll(req.session);
        res.render('profile', { orders });
    };
}

// Експортуємо вже готовий об’єкт-контролер (legacy tests чекають plain object)
const controller = new OrderController(
    container.facade,
    container.notifier,
    container.validatorChain
);

module.exports = controller;
