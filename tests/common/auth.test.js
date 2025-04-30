const request = require('supertest');
const app = require('../../original/app');

describe('Auth routes', () => {
    it('should render login page', async () => {
        const res = await request(app).get('/login');
        expect(res.statusCode).toBe(200);
        expect(res.text).toContain('Вхід');
    });

    it('should register user', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: 'test2', password: 'pass' });
        expect(res.statusCode).toBe(302);
    });

    it('should login user', async () => {
        const agent = request.agent(app);
        await agent.post('/login').send({ username: 'test2', password: 'pass' });
        const res = await agent.get('/');
        expect(res.text).toContain('🍊');
    });
});
