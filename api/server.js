const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('../middleware/logger');
const booksRouter = require('../books/router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
    res.send('<h1>📚</h1>');
});

// routes
server.use('/api/books', booksRouter);

module.exports = server;
