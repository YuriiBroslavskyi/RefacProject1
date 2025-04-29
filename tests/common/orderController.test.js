const orderController = require('../../refactored/src/controllers/orderController');
const mandarins = require('../../refactored/src/config/mandarins');

describe('orderController', () => {
    let req, res;

    beforeEach(() => {
        req = { session: { orders: [], lastMessage: null }, body: {} };
        res = { render: jest.fn(), redirect: jest.fn() };
    });

    test('getIndex renders index with mandarins and message', () => {
        req.session.lastMessage = 'Привіт';
        orderController.getIndex(req, res);
        expect(res.render).toHaveBeenCalledWith('index', {
            mandarins,
            message: 'Привіт'
        });
        expect(req.session.lastMessage).toBeNull();
    });

    test('postOrder with invalid id sets error message and redirects', () => {
        req.body.id = '999';
        orderController.postOrder(req, res);
        expect(req.session.lastMessage).toBe('Помилка: такого товару не знайдено.');
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('postOrder with valid id adds order and sets success message', () => {
        req.body.id = '1';
        orderController.postOrder(req, res);
        expect(req.session.orders).toHaveLength(1);
        expect(req.session.lastMessage).toBe(`Ви успішно замовили: ${mandarins[0].name}`);
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('getProfile renders profile with orders', () => {
        req.session.orders = [{ id: 1, name: 'A', price: 1, date: 'D' }];
        orderController.getProfile(req, res);
        expect(res.render).toHaveBeenCalledWith('profile', {
            orders: req.session.orders
        });
    });
});
