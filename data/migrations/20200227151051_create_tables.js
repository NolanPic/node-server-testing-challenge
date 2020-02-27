
exports.up = function(knex) {
    return knex.schema.createTable('books', tbl => {
        tbl.increments();
        tbl.string('title', 255)
            .notNullable()
            .index();
        tbl.string('author', 125)
            .notNullable()
            .index();
        tbl.string('shelf', 125)
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('books');
};
