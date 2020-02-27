const router = require('express').Router();
const Books = require('./model');

router.get('/', async (req, res) => {
    try{
        const books = await Books.get();
        res.status(200).json(books);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong getting books' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Books.getById(id);
        res.status(200).json(book);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong getting this book' })
    }
});

router.post('/', async (req, res) => {
    const book = req.body;
    try {
        const createdBook = await Books.create(book);
        res.status(201).json(createdBook);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong creating a book' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedBook = await Books.update(id, updates);
        res.status(200).json(updatedBook);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong updating this book' })
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Books.remove(id);
        res.status(204).send();
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong deleting this book' });
    }
});

module.exports = router;
