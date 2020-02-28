const Books = require('./model');
const db = require('../data/connection');

describe('books model', () => {
    beforeEach(async () => {
        await db('books').truncate();
    });

    describe('get books', () => {
        test('books table initially returns empty array', async () => {
            const books = await Books.get();
            expect(Array.isArray(books)).toBe(true);
            expect(books).toHaveLength(0);
        });

        test('books table returns books', async () => {
            const book = {
                title: "The Lion, the Witch, and the Wardrobe",
                author: "C.S. Lewis",
                shelf: "Reading"
            };

            await Books.create(book);
            const books = await Books.get();
            expect(books).toHaveLength(1);
        });

        test('return a book by its ID', async () => {
            
            const book = {
                title: "The Lion, the Witch, and the Wardrobe",
                author: "C.S. Lewis",
                shelf: "Reading"
            };
            const created = await Books.create(book);
            const bookById = await Books.getById(created.id);
            expect(bookById.title).toBe(book.title);

        });
    })

    test('inserting a book', async () => {
        const book = {
            title: "The Lion, the Witch, and the Wardrobe",
            author: "C.S. Lewis",
            shelf: "Reading"
        };
        
        const created = await Books.create(book);
        expect(created).toMatchObject(book);
    });

    test('updating a book', async () => {
        const book = {
            title: "The Lion, the Witch, and the Wardrobe",
            author: "C.S. Lewis",
            shelf: "Reading"
        };
        
        const { id: bookId } = await Books.create(book);
        const updates = {
            shelf: "Read"
        };

        const updatedBook = await Books.update(bookId, updates);
        expect(updatedBook.shelf).toBe(updates.shelf);
    });

    test('deleting a book', async () => {
        const book = {
            title: "The Lion, the Witch, and the Wardrobe",
            author: "C.S. Lewis",
            shelf: "Reading"
        };

        const { id: bookId } = await Books.create(book);
        expect(await Books.get()).toHaveLength(1);
        
        await Books.remove(bookId);
        expect(await Books.get()).toHaveLength(0);
    });
});