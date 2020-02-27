const request = require('supertest');
const server = require('./server');

test('db environment is set to "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('api', () => {
    describe('GET /', () => {
        test('responds with 200 status', async () => {
            const res = await request(server)
                .get('/');
            expect(res.status).toBe(200);
        })

        test('responds with HTML', async () => {
            const res = await request(server)
                .get('/');
            expect(res.type).toMatch(/html/i);
        });
    });
});
