const orderModel = require('../../original/models/orderModel');

describe('Order Model', () => {
    it('should save order to DB', async () => {
        const result = await orderModel.save({ userId: 1, mandarinId: 1, quantity: 2 });
        expect(result.affectedRows).toBe(1);
    });

    it('should return user orders', async () => {
        const orders = await orderModel.findByUserId(1);
        expect(Array.isArray(orders)).toBe(true);
    });

    it('should return empty array for new user', async () => {
        const orders = await orderModel.findByUserId(9999);
        expect(orders).toEqual([]);
    });
});
