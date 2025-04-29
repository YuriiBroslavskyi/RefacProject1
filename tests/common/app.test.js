const request = require('supertest');
const path = require('path');

const impl = process.env.IMPL;
let app, mandarins;

if (impl === 'original') {
    app = require(path.join(__dirname, '../../original/app'));
    // динамічно дістаємо MANDARINS
    const { MANDARINS } = require(path.join(__dirname, '../../original/controllers/orderController'));
    mandarins = MANDARINS;
} else {
    app = require(path.join(__dirname, '../../refactored/src/app'));
    mandarins = require(path.join(__dirname, '../../refactored/src/config/mandarins'));
}

describe(`Integration tests (${impl})`, () => {
    let server, agent;

    beforeAll((done) => {
        // запускаємо на довільному порту
        server = app.listen(0, done);
    });

    afterAll((done) => {
        server.close(done);
    });

    beforeEach(() => {
        // перед кожним тестом — новий agent, що тримає сесію
        agent = request.agent(server);
    });

    test('GET / returns 200 and contains title', async () => {
        const res = await agent.get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('🍊 Магазин мандаринок 🍊');
    });

    test('Content-Type is HTML for GET /', async () => {
        const res = await agent.get('/');
        expect(res.header['content-type']).toMatch(/html/);
    });

    test('Each mandarin name is listed', async () => {
        const res = await agent.get('/');
        mandarins.forEach(m => {
            expect(res.text).toContain(m.name);
        });
    });

    test('Hidden id input present for each mandarin', async () => {
        const res = await agent.get('/');
        mandarins.forEach(m => {
            expect(res.text).toContain(`name="id" value="${m.id}"`);
        });
    });

    test('POST /order without id redirects (302)', async () => {
        const res = await agent.post('/order').send('');
        expect(res.status).toBe(302);
        expect(res.header.location).toBe('/');
    });

    test('Error displayed after invalid order', async () => {
        await agent.post('/order').send('id=999');
        const res = await agent.get('/');
        expect(res.text).toContain('Помилка: такого товару не знайдено.');
    });

    test('POST /order with valid id redirects and shows success message', async () => {
        await agent.post('/order').send(`id=${mandarins[1].id}`);
        const res = await agent.get('/');
        expect(res.text).toContain(`Ви успішно замовили: ${mandarins[1].name}`);
    });

    test('GET /profile returns 200', async () => {
        const res = await agent.get('/profile');
        expect(res.status).toBe(200);
    });

    test('Profile shows no orders when empty', async () => {
        const res = await agent.get('/profile');
        expect(res.text).toContain('Ви ще не замовляли нічого.');
    });

    test('Order appears in profile after one order', async () => {
        await agent.post('/order').send(`id=${mandarins[2].id}`);
        const res = await agent.get('/profile');
        expect(res.text).toContain(mandarins[2].name);
        expect(res.text).toMatch(/\([^)]+\)/);
    });

    test('Multiple orders persist in session', async () => {
        await agent.post('/order').send(`id=${mandarins[0].id}`);
        await agent.post('/order').send(`id=${mandarins[1].id}`);
        const res = await agent.get('/profile');
        const countLi = (res.text.match(/<li>/g) || []).length;
        expect(countLi).toBe(2);
    });

    test('Redirect after valid order always 302', async () => {
        const res = await agent.post('/order').send(`id=${mandarins[0].id}`);
        expect(res.status).toBe(302);
    });

    // 20-й тест
    test('Index page lists all mandarin names again (20th)', async () => {
        const res = await agent.get('/');
        mandarins.forEach(m => {
            expect(res.text).toContain(m.name);
        });
    });
});
