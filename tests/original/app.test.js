const request = require('supertest');
const app = require('../../original/app');

describe('Original Minimal Integration (20 tests)', () => {
    it('1. GET /register → 200', async () => {
        const res = await request(app).get('/register');
        expect(res.status).toBe(200);
    });
    it('2. GET /register returns HTML', async () => {
        const res = await request(app).get('/register');
        expect(res.headers['content-type']).toMatch(/html/);
    });
    it('3. GET /login → 200', async () => {
        const res = await request(app).get('/login');
        expect(res.status).toBe(200);
    });
    it('4. GET /login returns HTML', async () => {
        const res = await request(app).get('/login');
        expect(res.headers['content-type']).toMatch(/html/);
    });
    it('5. GET / → 302 (anon)', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(302);
    });
    it('6. GET /profile → 302 (anon)', async () => {
        const res = await request(app).get('/profile');
        expect(res.status).toBe(302);
    });
    it('7. POST /register → not 500', async () => {
        const res = await request(app).post('/register').send({});
        expect(res.status).not.toBe(500);
    });
    it('8. POST /login → not 500', async () => {
        const res = await request(app).post('/login').send({});
        expect(res.status).not.toBe(500);
    });
    it('9. POST /order → 302 or 500', async () => {
        const res = await request(app).post('/order').send({});
        expect([302, 500]).toContain(res.status);
    });
    it('10. POST /logout → 302', async () => {
        const res = await request(app).post('/logout');
        expect(res.status).toBe(302);
    });
    it('11. GET /styles.css → 200', async () => {
        const res = await request(app).get('/styles.css');
        expect(res.status).toBe(200);
    });
    it('12. GET /styles.css returns CSS', async () => {
        const res = await request(app).get('/styles.css');
        expect(res.headers['content-type']).toMatch(/css/);
    });
    it('13. GET /favicon.ico → 404', async () => {
        const res = await request(app).get('/favicon.ico');
        expect(res.status).toBe(404);
    });
    it('14. GET /unknown → 404 or 302', async () => {
        const res = await request(app).get('/no_such_route');
        expect([404, 302]).toContain(res.status);
    });
    it('15. /register page has username field', async () => {
        const res = await request(app).get('/register');
        expect(res.text).toMatch(/name="username"/);
    });
    it('16. /login page has password field', async () => {
        const res = await request(app).get('/login');
        expect(res.text).toMatch(/name="password"/);
    });
    it('17. POST /register redirect has location header if 302', async () => {
        const res = await request(app).post('/register').send({});
        if (res.status === 302) expect(res.header.location).toBeDefined();
    });
    it('18. POST /login redirect has location header if 302', async () => {
        const res = await request(app).post('/login').send({});
        if (res.status === 302) expect(res.header.location).toBeDefined();
    });
    it('19. POST /order redirect has location header if 302', async () => {
        const res = await request(app).post('/order').send({ id: 1 });
        if (res.status === 302) expect(res.header.location).toBeDefined();
    });
    it('20. Navbar has Home link on /register', async () => {
        const res = await request(app).get('/register');
        expect(res.text).toContain('href="/">Головна');
    });

    afterAll(async () => {
        try { const pool = require('../../original/db'); await pool.end(); } catch { }
    });
});
