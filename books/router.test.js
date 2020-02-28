const request = require('supertest');
const server = require('../api/server');
const Books = require('../books/model');
const db = require('../data/connection');

describe('books router', () => {
    beforeEach(async () => {
        await db('books').truncate();
    });

    describe('GET /', () => {
        test('responds with 200', async () => {
            const res = await request(server).get('/api/books');
            expect(res.status).toBe(200);
        });

        test('responds with books in json format', async () => {
            const book = {
                title: "The Lion, the Witch, and the Wardrobe",
                author: "C.S. Lewis",
                shelf: "Reading"
            };

            await Books.create(book);

            const res = await request(server).get('/api/books');
            expect(res.type).toMatch(/json/i);
            expect(res.body).toHaveLength(1);
            expect(res.body[0]).toMatchObject(book);
        });
    });

    describe('POST /', () => {
        test('responds with 201', async () => {
            const book = {
                title: "The Lion, the Witch, and the Wardrobe",
                author: "C.S. Lewis",
                shelf: "Reading"
            };
            const res = await request(server).post('/api/books')
                .send(book)
                .set('Accept', 'application/json');
            expect(res.status).toBe(201);
        });

        test('responds with a json object of the created book', async () => {
            const book = {
                title: "The Lion, the Witch, and the Wardrobe",
                author: "C.S. Lewis",
                shelf: "Reading"
            };

            const res = await request(server).post('/api/books')
                .send(book)
                .set('Accept', 'application/json');

            expect(res.type).toMatch(/json/i);
            expect(res.body).toMatchObject(book);
        });
    });

    test('PUT / responds with a json object of the updated book', async () => {
        const book = {
            title: "The Lion, the Witch, and the Wardrobe",
            author: "C.S. Lewis",
            shelf: "Reading"
        };
        const { id: bookId } = await Books.create(book);

        const updates = {
            shelf: "Read"
        };
        const res = await request(server).put(`/api/books/${bookId}`)
            .send(updates)
            .set('Accept', 'application/json');
        expect(res.body.shelf).toBe(updates.shelf);
    });
});
