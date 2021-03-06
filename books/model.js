const db = require('../data/connection');

module.exports = {
    get,
    getById,
    create,
    update,
    remove
};

async function get() {
    return db('books');
}

async function getById(id) {
    return db('books')
        .where({ id })
        .first();
}

async function create(book) {
    const [id] = await db('books')
        .insert(book)
        .returning('id');
    return getById(id);
}

async function update(id, updates) {
    await db('books')
        .where({ id })
        .update(updates);

    return getById(id);
}

async function remove(id) {
    return db('books')
        .where({ id })
        .delete();
}
