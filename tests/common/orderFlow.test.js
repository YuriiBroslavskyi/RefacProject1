const request = require('supertest');
// const app = require('../../original/app');
const app = require('../../refactored/src/app');

describe('Order flow', () => {
    const agent = request.agent(app); // використовуємо agent для збереження сесії

    beforeAll(async () => {
        await agent.post('/register').send({ username: 'flowUser', password: 'flowPass' });
        await agent.post('/login').send({ username: 'flowUser', password: 'flowPass' });
    });

    it('should place an order and redirect to profile', async () => {
        const res = await agent.post('/order').send({ mandarinId: 1, quantity: 1 });
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe('/profile');
    });

    it('should display the order in profile', async () => {
        const res = await agent.get('/profile');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Ваші замовлення');
    });
});
