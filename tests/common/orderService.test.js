const OrderService = require('../../refactored/src/services/orderService');

describe('OrderService', () => {
    let session;
    let orderService;

    beforeEach(() => {
        // Фіксуємо час для передбачуваного форматування дати
        jest.useFakeTimers('modern').setSystemTime(new Date('2025-04-25T12:00:00Z'));
        session = { orders: [] };
        orderService = new OrderService(session);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('getAll returns empty array initially', () => {
        expect(orderService.getAll()).toEqual([]);
    });

    test('createOrder adds an order to session.orders', () => {
        orderService.createOrder({ id: 1, name: 'Test', price: 5 });
        expect(session.orders).toHaveLength(1);
    });

    test('createOrder returns order with correct properties', () => {
        const order = orderService.createOrder({ id: 2, name: 'Sample', price: 10 });
        expect(order).toMatchObject({ id: 2, name: 'Sample', price: 10 });
        expect(order.date).toBe(new Date().toLocaleString('uk-UA'));
    });

    test('multiple orders stored correctly', () => {
        orderService.createOrder({ id: 1, name: 'A', price: 1 });
        orderService.createOrder({ id: 2, name: 'B', price: 2 });
        expect(orderService.getAll()).toHaveLength(2);
        expect(orderService.getAll().map(o => o.id)).toEqual([1, 2]);
    });
});
